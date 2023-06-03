import dotenv from "dotenv";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

dotenv.config(); // Mengimpor dotenv untuk mengakses variabel dari file .env

class MongooseDB {
  constructor() {
    // Membaca URL koneksi MongoDB dari file .env
    const mongoUrl = process.env.mongodb_url;

    // Menghubungkan ke MongoDB menggunakan URL koneksi
    mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
        dbName: "grammybotdb", // Nama database yang diinginkan
      })
      .then(() => {
        console.log("Terhubung ke MongoDB");
      })
      .catch((error) => {
        console.error("Gagal terhubung ke MongoDB:", error);
      });

    // Membuat skema dan model jika diperlukan
    const jsonSchema = new mongoose.Schema(
      {
        data: {
          type: Object,
          required: true,
          default: {},
        },
      },
      { collection: "data" } // Nama collection yang diinginkan
    );

    this.database = mongoose.model("data", jsonSchema);
  }

  // Method untuk membuat data baru
  async createData(data) {
    try {
      const createdData = await this.database.create(data);
      console.log("Data berhasil disimpan:", createdData);
      return createdData;
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      throw error;
    }
  }

  // Method untuk membaca data berdasarkan kriteria
  async readData(criteria) {
    try {
      const foundData = await this.database.find(criteria);
      console.log("Data ditemukan:", foundData);
      return foundData;
    } catch (error) {
      console.error("Gagal membaca data:", error);
      throw error;
    }
  }

  // Method untuk memperbarui data berdasarkan kriteria
  async updateData(criteria, newData) {
    try {
      const updatedData = await this.database.updateMany(criteria, newData);
      console.log("Data berhasil diperbarui:", updatedData);
      return updatedData;
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      throw error;
    }
  }

  // Method untuk menghapus data berdasarkan kriteria
  async deleteData(criteria) {
    try {
      const deletedData = await this.database.deleteMany(criteria);
      console.log("Data berhasil dihapus:", deletedData);
      return deletedData;
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      throw error;
    }
  }
}

export default MongooseDB;
