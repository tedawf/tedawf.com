interface ContactFormEmailProps {
  name: string;
  email: string;
  message: string;
}

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <p>Hey {name},</p>
    <p>
      <strong>Your Email:</strong>
    </p>
    <p>{email}</p>
    <p>
      <strong>Your Message:</strong>
    </p>
    <p>{message}</p>
    <hr />
    <p>Thank you for your message, {name}! I will reply as soon as I can.</p>
    <p>&copy; 2024 tedawf.coms</p>
  </div>
);

export default ContactFormEmail;
