import { getData, saveData } from "../utils/useData.js";

export const getAllWallets = (req, res) => {
  try {
    let { wallets } = getData();

    if (req.query.user_id) {
      wallets = wallets.filter((w) => w.user_id === req.query.user_id);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const start = (page - 1) * limit;
    const end = start + limit;

    const result = wallets.slice(start, end);

    res.status(200).json({ wallets: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wallets", error: error.message });
  }
};

export const createWallet = (req, res) => {
  try {
    const { user_id, name } = req.body;

    const data = getData();
    const userExists = data.users.some((u) => u.id === user_id);
    if (!userExists) {
      return res
        .status(404)
        .json({ message: "User not found. Cannot create wallet." });
    }

    const newWallet = {
      id: crypto.randomUUID(),
      user_id,
      name: name || "My Wallet",
      sold: 0,
    };

    data.wallets.push(newWallet);
    saveData(data);

    res.status(201).json(newWallet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating wallet", error: error.message });
  }
};

export const getWalletById = (req, res) => {
  try {
    const { wallets } = getData();
    const wallet = wallets.find((w) => w.id === req.params.id);
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });
    res.status(200).json(wallet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wallet", error: error.message });
  }
};

export const updateWallet = (req, res) => {
  try {
    const data = getData();
    const index = data.wallets.findIndex((w) => w.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Wallet not found" });

    data.wallets[index].name = req.body.name || data.wallets[index].name;

    saveData(data);
    res.status(200).json(data.wallets[index]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating wallet", error: error.message });
  }
};

export const deleteWallet = (req, res) => {
  try {
    let data = getData();
    const exists = data.wallets.some((w) => w.id === req.params.id);
    if (!exists) return res.status(404).json({ message: "Wallet not found" });

    data.wallets = data.wallets.filter((w) => w.id !== req.params.id);

    saveData(data);
    res.status(200).json({ message: "Wallet deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting wallet", error: error.message });
  }
};

export const deposit = (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Amount must be positive" });

    const data = getData();

    const index = data.wallets.findIndex((w) => w.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Wallet not found" });

    data.wallets[index].sold += amount;
    saveData(data);
    res.status(200).json(data.wallets[index]);
  } catch (error) {
    res.status(500).json({ message: "Deposit failed", error: error.message });
  }
};

export const withdraw = (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Amount must be positive" });

    const data = getData();
    const index = data.wallets.findIndex((w) => w.id === req.params.id);
    if (index === -1)
      return res.status(404).json({ message: "Wallet not found" });

    if (data.wallets[index].sold < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    data.wallets[index].sold -= amount;
    saveData(data);
    res.status(200).json(data.wallets[index]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Withdrawal failed", error: error.message });
  }
};
