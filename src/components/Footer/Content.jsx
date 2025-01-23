import React, { useState } from "react";

export default function Content() {
  return (
    <div className="content-container">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="section2-container">
      <h1 className="section2-heading">Contact Me</h1>
      <p>kolade '25</p>
    </div>
  );
};

const navItems = [
    { label: 'Instagram', value: 'https://www.instagram.com/kolvde/' },
    { label: 'Email', value: 'koladebalogun.kb@gmail.com' },
    { label: 'Linkedin', value: 'https://www.linkedin.com/in/koladebalogun/' },
    { label: 'Github', value: 'https://github.com/koladebalogun' },
  ];
  
  const Nav = () => {
    const [copiedText, setCopiedText] = useState('');
  
    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000); // Clear message after 2 seconds
    };
  
    return (
      <div className="nav-container">
        <div className="nav-column">
          <h3 className="nav-title">Socials</h3>
          {navItems.map((item) => (
            <div key={item.value} className="copy-container">
              <p
                onClick={() => handleCopy(item.value)}
                className="copyable"
              >
                {item.label}
              </p>
              {copiedText === item.value && (
                <span className="copied-message">Copied!</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  