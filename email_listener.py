import email
from email import policy
from email.parser import BytesParser
import imaplib
import os
import requests
import time
from dotenv import load_dotenv

# --- Configuration ---
load_dotenv()
IMAP_HOST = os.getenv("IMAP_HOST")
IMAP_USER = os.getenv("IMAP_USER")
IMAP_PASS = os.getenv("IMAP_PASS")
API_ENDPOINT = "http://127.0.0.1:8000/api/v1/tickets/"


def process_inbox():
    print("Checking for new emails...")
    mail = None
    try:
        mail = imaplib.IMAP4_SSL(IMAP_HOST)
        mail.login(IMAP_USER, IMAP_PASS)
        mail.select("inbox")
        status, messages = mail.search(None, "UNSEEN")

        if status == "OK":
            email_ids = messages[0].split()
            if len(email_ids) > 0:
                print(f"Found {len(email_ids)} new email(s).")
            
            for email_id in email_ids:
                status, msg_data = mail.fetch(email_id, "(RFC822)")
                for response_part in msg_data:
                    if isinstance(response_part, tuple):
                        msg = BytesParser(policy=policy.default).parsebytes(response_part[1])
                        subject = msg["subject"]
                        sender = msg["from"]
                        
                        body_part = msg.get_body(preferencelist=('plain',))
                        body = ""
                        if body_part:
                            # --- THIS IS THE FIX ---
                            # The .get_content() method automatically handles decoding
                            body = body_part.get_content()
                            # --- END OF FIX ---

                        print(f"Processing email from {sender} with subject: {subject}")

                        ticket_data = {
                            "source_system": "email",
                            "created_by": sender,
                            "subject": subject,
                            "description": body,
                            "priority": "Medium"
                        }
                        
                        proxies = { "http": None, "https": None }
                        response = requests.post(API_ENDPOINT, json=ticket_data, proxies=proxies)
                        
                        if response.status_code == 201:
                            print("Successfully created ticket in the backend.")
                        else:
                            print(f"Error creating ticket: {response.status_code} {response.text}")
    
    except Exception as e:
        print(f"An error occurred: {e}")
    
    finally:
        if mail:
            mail.logout()


# --- Main Loop ---
if __name__ == "__main__":
    print("Starting email listener...")
    while True:
        process_inbox()
        print("Sleeping for 60 seconds...")
        time.sleep(60)