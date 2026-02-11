// Demo employee data
const employees = [
  { id: "MS-EMP-01", password: "1234", name: "Monesh" }
];

function login() {
  const empId = document.getElementById("empId").value;
  const password = document.getElementById("password").value;

  const user = employees.find(
    emp => emp.id === empId && emp.password === password
  );

  if (user) {
    alert("Welcome " + user.name);
  } else {
    alert("Invalid Login");
  }
}

// QR Scanner
const qr = new Html5Qrcode("reader");

qr.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 200 },
  (decodedText) => {
    document.getElementById("empId").value = decodedText;
  }
);
