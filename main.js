//console.log("kontrol")
// 1-Tüm koltukların kapsayıcı container divi çek.
// 2-container a clikck eventi ekle
//* html tarafından querySelector ile className üzerinden eleman çekme.
const container = document.querySelector(".container");
//!HTLM tarafından çekilen kodun kontrolü
//console.log(container)
const infoText = document.querySelector(".info-text");
//console.log("infoText");
const movieList = document.querySelector("#movie");
//console.log(movieList)

const seatCount = document.getElementById("count");
//console.log(seatCount)

const totalAmount = document.getElementById("amount");
//console.log(totalAmount)
const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

const saveToDateBase = (index) => {
  // console.log('data',index)
  //Kodu JSAN metoduna döndürmeyi sağlar
  localStorage.setItem("seatsIndex", JSON.stringify(index));
//! film verisi kaydı
localStorage.setItem('movieIndex', JSON.stringify(movieList.selectedIndex))
};

const getFromDataBase=()=>{
  const dbSelectedSeats =JSON.parse(localStorage.getItem('seatsIndex'))
  //console.log(dbSelectedSeats)
  if(dbSelectedSeats!==null){
    seats.forEach((seat,index)=>{
    if(dbSelectedSeats.includes(index)){
      seat.classList.add('selected')
    }
    })
  }
  const dbSelectedMovie= JSON.parse(localStorage.getItem('movieIndex'))
  movieList.selectedIndex = dbSelectedMovie
}
getFromDataBase()
const createIndex = () => {
  let allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  //console.log(allSeatsArray)

  const allSelectedSeatsArray = [];
  const allSelectedSeats = container.querySelectorAll(".seat.selected");
  
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });
  //console.log(allSelectedSeatsArray)
  //map metodu sadece array lerde kullanılır.
  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatsIndex)
  saveToDateBase(selectedSeatsIndex);
};

const calculateTotal = () => {
  createIndex();
  //console.log("calculate çalıştı")
  //querySelectorAll birden fazala class'ı ekleyebilirim.
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log('selectedSeatsCount')
  // html de olan bir kodu ekranda yazdırmak için innerText kullanılır.
  seatCount.innerText = selectedSeatsCount;
  //console.log(count);
  totalAmount.innerText = selectedSeatsCount * movieList.value;
  //console.log(totalAmount)
  if (selectedSeatsCount > 0) {
    infoText.classList.add("open");
  } else {
    //console.log("selectedSeatsCount");
    infoText.classList.remove("open");
  }
};
calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  //console.log("container tıklandı")
  // hedef elemanda bir üst elemana ulaşmak istiyorsan offsetParent kullanılır.
  //Böylece  li de bulanan seatler değil direkt div'in içindeki seat'e ulaşılır.
  //console.log(pointerEvent.target.offsetParent)
  const clickedSeat = pointerEvent.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});
