const React = require('react');
const Default = ({ children, title }) => {
  return (
    <html>
      <head>
        <title>{title || 'Default'}</title>
        <link rel="shortcut icon" type="image/jpg" href="data:image/png;base64,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" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossOrigin="anonymous" />
        {/* normalize & skeleton links */}
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div className="wrapper">
          <header>
            <h1><a href="/breads">BreadCRUD</a></h1>
          </header>
          <div className="container">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
};
module.exports = Default;