export default function ServicesPage() {

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Services</h1>
      <p>Please navigate to a specific service:</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="/services/sign-connect">Sign Connect</a></li>
        <li><a href="/services/biz-connect">Biz Connect</a></li>
        <li><a href="/services/pay-connect">Pay Connect</a></li>
        <li><a href="/services/gov-connect">Gov Connect</a></li>
        <li><a href="/services/safe-connect">Safe Connect</a></li>
      </ul>
    </div>
  );
}