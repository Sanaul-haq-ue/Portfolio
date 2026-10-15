# Connect the contact form to Google Sheets

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with the latest `Code.gs` from this folder and save.
3. Choose **Deploy → Manage deployments**, edit the web app deployment, select **New version**, and deploy. For a first deployment, choose **New deployment → Web app**. Set **Execute as** to your account and access to **Anyone**, then authorize it.
4. Copy the web app URL ending in `/exec` into `.env` as `VITE_GOOGLE_SHEETS_WEB_APP_URL=`. If you already set this URL, keep it unless you created a new deployment.
5. Restart the Vite dev server (and set the same environment variable in your production host) to load the URL.

The script writes a timestamp, email, subject, and project description to the tab with gid `1813516910`. It creates a header row when the tab is empty and sends an explicit save result back to the form. Keep the web app URL private to your deployment configuration; anyone who obtains it can submit rows to the sheet.
