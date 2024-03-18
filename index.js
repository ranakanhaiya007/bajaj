const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { name, email, phone, rollNumber } = req.body;
    if (!name || !email || !phone || !rollNumber) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const data = {
      name,
      email,
      phone,
      rollNumber,
    };
    console.log(data);
    const response = await fetch(
      "https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/createAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
    console.log("res", response);
    const acc = response.accountNumber;
    const d2 = {
      company: "Bajaj Finserv Ltd",
      accountNumber: acc,
      currentPrice: 1575,
      githubRepoLink:"https://github.com/ranakanhaiya007/bajaj"
    };
    const r2 = await fetch(
      "https://customer-analytics-34146.my.salesforce-sites.com/services/apexrest/buyStocks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bfhl-auth": "2110990717",
        },
        body: JSON.stringify(d2),
      },
    )
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
    console.log(r2);
    res.status(200).json({ message: "Account created successfully", r2 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
