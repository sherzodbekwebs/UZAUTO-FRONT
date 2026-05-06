export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Error' });

    const { name, phone, message } = req.body;
    const SUBDOMAIN = 'uzautotrailer';
    const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2MWIwZDMxYzk1NDY2MWY4ZGNjMGEzMDJmMGU3ZTQ1Y2FlN2RhMmU4NDhmZWJiMjJhZWY3MzMyMTdiZTJkMzQzMjliZjMzZGRhNTM4NDNjIn0...'; // O'zingizning to'liq tokeningiz

    try {
        // 1. Avval kontakt yaratamiz
        const contactRes = await fetch(`https://${SUBDOMAIN}.amocrm.ru/api/v4/contacts`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                name: name,
                custom_fields_values: [{
                    field_code: "PHONE",
                    values: [{ value: phone, enum_code: "WORK" }]
                }]
            }])
        });
        const contactData = await contactRes.json();
        const contactId = contactData._embedded.contacts[0].id;

        // 2. Keyin bitimni (Lead) aynan o'sha ustunga (Status ID) yaratamiz
        const leadRes = await fetch(`https://${SUBDOMAIN}.amocrm.ru/api/v4/leads`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                name: `Xabar: ${name}`,
                status_id: 85644878,   // Siz topgan Status ID
                pipeline_id: 8390522, // Call center voronkasi
                _embedded: {
                    contacts: [{ id: contactId }]
                },
                custom_fields_values: [{
                    field_id: 1047683, // Xabar maydoni
                    values: [{ value: message }]
                }]
            }])
        });

        const leadData = await leadRes.json();
        return res.status(200).json({ success: true, leadData });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}