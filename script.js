// Function to calculate the total cost of all services

function updateDevelopmentCharges() {
  const developmentSelect = document.querySelector('.development-select');
  const selectedOptionValue = parseFloat(developmentSelect.value);
  const chargeInrElement = document.querySelector('.development-charge-inr');
  const chargeUsdElement = document.querySelector('.development-charge-usd');
  chargeInrElement.textContent = selectedOptionValue;
  chargeUsdElement.textContent = (selectedOptionValue / 40).toFixed(2);
}

// Function to update hosting charges
function updateHostingCharges() {
  const hostingSelect = document.querySelector('.hosting-select');
  const selectedOptionValue = parseFloat(hostingSelect.value);
  const chargeInrElement = document.querySelector('.hosting-charge-inr');
  const chargeUsdElement = document.querySelector('.hosting-charge-usd');
  chargeInrElement.textContent = selectedOptionValue;
  chargeUsdElement.textContent = (selectedOptionValue / 40).toFixed(2);
}

function calculateTotalCost() {
  const rows = document.querySelectorAll('table tr:not(:first-child)');
  let totalInr = 0;
  let totalUsd = 0;

  rows.forEach((row) => {
    const serviceChargeInr = parseFloat(row.children[1].textContent);
    const serviceChargeUsd = parseFloat(row.children[2].textContent);
    const units = parseFloat(row.querySelector('.units').value);
    const costInr = serviceChargeInr * units;
    const costUsd = serviceChargeUsd * units;

    row.querySelector('.cost-inr').textContent = costInr;
    row.querySelector('.cost-usd').textContent = costUsd;

    totalInr += parseFloat(costInr);
    totalUsd += parseFloat(costUsd);
  });

  document.getElementById('total-inr').textContent = totalInr;
  document.getElementById('total-usd').textContent = totalUsd;
}

// Function to handle the "Mail Quote" button
function handleMailButton() {
  const totalInr = document.getElementById('total-inr').textContent;
  const totalUsd = document.getElementById('total-usd').textContent;

  // Replace 'mailto' with the desired recipient email address
  window.location.href = `mailto:recipient@example.com?subject=Web Development Quote&body=Total ₹: ${totalInr}%0D%0ATotal $: ${totalUsd}`;
}

// Function to handle the "Send via WhatsApp" button
function handleWhatsAppButton() {
  const totalInr = document.getElementById('total-inr').textContent;
  const totalUsd = document.getElementById('total-usd').textContent;

  // Replace 'whatsapp://send' with the WhatsApp API URL or custom link scheme if needed
  window.location.href = `whatsapp://send?text=Total ₹: ${totalInr}%0D%0ATotal $: ${totalUsd}`;
}

// Function to handle the "Generate PDF" button
function handlePDFButton() {
  // Implement the PDF generation logic here, or use a third-party library like jsPDF.
  // Example code using jsPDF to generate a simple PDF
  // var doc = new jsPDF();
  // doc.text(20, 20, 'Total ₹: ' + document.getElementById('total-inr').textContent);
  // doc.text(20, 30, 'Total $: ' + document.getElementById('total-usd').textContent);
  // doc.save('web_development_quote.pdf');
}

// Attach event listeners to buttons
document
  .getElementById('mail-button')
  .addEventListener('click', handleMailButton);
document
  .getElementById('whatsapp-button')
  .addEventListener('click', handleWhatsAppButton);
document
  .getElementById('pdf-button')
  .addEventListener('click', handlePDFButton);

// Calculate total cost on page load
calculateTotalCost();

// Attach event listeners to input fields to update total cost dynamically
const inputFields = document.querySelectorAll('.units');
inputFields.forEach((input) => {
  input.addEventListener('input', calculateTotalCost);
});

// Update total cost when development service option is changed
const developmentSelect = document.querySelector('.development-select');
developmentSelect.addEventListener('change', () => {
  updateDevelopmentCharges();
  calculateTotalCost();
});

// Update total cost when hosting service option is changed
const hostingSelect = document.querySelector('.hosting-select');
hostingSelect.addEventListener('change', () => {
  updateHostingCharges();
  calculateTotalCost();
});
