document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Arabica Blend", img: "2.jpg", price: 25000 },
      { id: 3, name: "Primo Passo", img: "3.jpg", price: 30000 },
      { id: 4, name: "Aceh Gayo", img: "4.jpg", price: 35000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 40000 },
    ],
  }));

  //product-cart
  Alpine.store("cart", {
    items: [], //awalnya item kosong
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang saa di cart
      const cartItem = this.items.find((item) => item.id === newItem.id); //cari sebuah item yang id nya sama dengan id item barang baru

      //jika belum ada/ cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price }); //menambah product ke keranjang belanja. karena items itu property jadi harus diawali dengan "this."
        this.quantity++; //menghitung keseluruhan barang yang ada di cart
        this.total += newItem.price; //menghitung jumlah belanja
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++; //menghitung keseluruhan barang yang ada di cart
            this.total += item.price; //menghitung jumlah belanja
            return item;
          }
        });
      }
    },

    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu2
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi mata uang ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, //menghilangkan 2 angka 0 nol dibalik koma
  }).format(number);
};
