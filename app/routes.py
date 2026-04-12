from flask import Blueprint, render_template, redirect, url_for, flash, request
from app.forms import ContactForm
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods=['GET', 'POST'])
def index():
    form = ContactForm()
    
    if form.validate_on_submit():
        try:
            # Build and send email
            msg = MIMEMultipart()
            msg['From'] = os.getenv('MAIL_USERNAME')
            msg['To'] = os.getenv('MAIL_USERNAME')
            msg['Subject'] = f"Portfolio Contact: {form.subject.data}"
            
            body = f"""
New message from your portfolio website:

Name: {form.name.data}
Email: {form.email.data}
Subject: {form.subject.data}

Message:
{form.message.data}
            """
            msg.attach(MIMEText(body, 'plain'))
            
            # Send via SMTP
            server = smtplib.SMTP(os.getenv('MAIL_SERVER'), int(os.getenv('MAIL_PORT')))
            server.starttls()
            server.login(os.getenv('MAIL_USERNAME'), os.getenv('MAIL_PASSWORD'))
            server.send_message(msg)
            server.quit()
            
            flash('Thank you! Your message has been sent successfully.', 'success')
            return redirect(url_for('main.index'))   # Stay on the same page
            
        except Exception as e:
            flash(f'Sorry, something went wrong. Please try again or email me directly at Zac9Vincent@hotmail.com', 'error')
    
    # For GET requests (or after successful POST)
    return render_template('index.html', form=form)


# Keep these simple for now (they can be removed later if you want everything on one page)
@main_bp.route('/about')
def about():
    return render_template('about.html')

@main_bp.route('/projects')
def projects():
    return render_template('projects.html')

@main_bp.route('/skills')
def skills():
    return render_template('skills.html')