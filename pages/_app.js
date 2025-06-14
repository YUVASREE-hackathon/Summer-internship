import "../styles.css"; // ✅ Safe and universal


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}