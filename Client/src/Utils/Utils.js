export function getAccessTokenInfo() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return;
  return accessToken;
}

export const calculateTotalPrice = (cart) => {
  let totalPrice = 0;

  if (cart && Object.keys(cart).length > 0) {
    // Jika cart tidak kosong
    Object.values(cart).forEach((item) => {
      // Mengambil harga dan jumlah produk dari setiap item di cart
      const { price, quantity } = item;
      // Menghitung total harga untuk item tersebut
      const itemTotalPrice = price * quantity;
      // Menambahkan total harga item ke totalPrice
      totalPrice += itemTotalPrice;
    });
  }

  return totalPrice;
};
