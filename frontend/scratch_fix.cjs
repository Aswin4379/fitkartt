const fs = require('fs');
const files = ['src/pages/Splash.jsx', 'src/pages/Signup.jsx', 'src/pages/Login.jsx', 'src/components/TopBar.jsx', 'src/components/Footer.jsx'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/src="\/workout-logo\.png"/g, 'src={import.meta.env.BASE_URL + "workout-logo.png"}');
  fs.writeFileSync(f, c);
});
