const allowedIPs = [
  '127.0.0.1',
  '::1',
  '203.0.113.25'
];

const restrictByIP = (req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const cleanedIP = clientIP.replace('::ffff:', '');

  if (allowedIPs.includes(cleanedIP)) {
    return next();
  }

  console.warn(`❌ Access denied for IP: ${cleanedIP}`);
  return res.status(403).json({ message: 'Access Denied: Unauthorized IP address' });
};

export default restrictByIP;
