import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(){
            var redirect = sessionStorage.redirect;
            delete sessionStorage.redirect;
            if (redirect && redirect != location.href) {
            history.replaceState(null, null, redirect);
            }
        })();`,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
