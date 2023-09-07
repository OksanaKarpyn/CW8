// racogliamo tutti i elementi di interesse

let totalPrice = document.querySelector('.total-price');
let giftListElement = document.querySelector('.gifts-list');
let form = document.getElementById('form-send');
// campi del form
let inputName = document.querySelector('#input-name') ;
let inputPrice = document.querySelector('#input-price') ;
let inputDescription = document.querySelector('#input-description') ;

// prepariamo la lista scatola vuota dove inser dentro elem
let gifts = [];
//se vogliamo  che browser si ricordi della lista  usiamo localstorage creo chiave
const local_storage_Key = '__xmas-list__';

//controllo se ci sono elementi salvati nello storage
const prewList = localStorage.getItem(local_storage_Key);
//controllo se esiste se lo trovi...
if(prewList){
	//step 1.utilizamo lista precedente al posto di quella vuota
	gifts = JSON.parse(prewList);
	//step 2. ricalcolo
	calcolateTotale()
	//step 3. mosta in pag gift
	mostraGift();
}



//----------- eventi dinanici---------
//attiviamo il form 
form.addEventListener('submit',function(event){
	//1.submit scat evento con enter o clik bottone
	//2.funzione con istruzioni da eseguire
	
	//step1.blochiamo ricaricamento dell paggina perche vogliamo gestire con javascript
	event.preventDefault();
	console.log('invio');

   //step 2. racogliere i dati del form
	const name = inputName.value.trim();
	const price = inputPrice.value.trim();
	const description = inputDescription.value.trim();


	//step 3. aggiungere regalo in lista
	//creo funzione fuorui e lo riutilizzo
	addGift(name,price,description);
	//step 4. ripulire il form
	form.reset();
	//step 5 riportiamo il focus sul primo campo
	inputName.focus();

})
// ---------functioni-----


//funzione x agg un regalo all lista
 function addGift(name,price,description){
	//step 1. creare un oggetto che rapres un regalo 
	const newGift = {
		// propieta: valore
		name :name,
		price:Number(price),
		description: description
	}
	console.log(newGift);
	//step 2. agg l'oggetoo alla lista
	gifts.push(newGift);
	console.log(gifts);
	//step 2/a. local storage aggiornare la lista dopo il caricamento
	localStorage.setItem(local_storage_Key, JSON.stringify(gifts));
	//step 3. calcoliamo il totale
	calcolateTotale();
	//step 4. mostriamo in pag lista dei regali
	mostraGift();
 }


 //funzione che calcola il totale 
 function calcolateTotale(){
	//mi preparo a calcolare 
	let total = 0;
	//per ogni regalo......
	for(let i = 0; i < gifts.length; i++){
		//total = total + gifts[i].price; 
		//pi corto
		total += gifts[i].price;
	}
	console.log(total);
	//stampiamo in pag il totale
	totalPrice.innerHTML = `${formatCifra(total)} €`; 

 }

 //funzione per formattare una cifra 
 function formatCifra(cifra){
	return cifra.toFixed(2);
 }

 //funzione per mostrare i regali in paggina
  function mostraGift(){
	// !todo ?? prima svottiamo  e pio recostruita
	giftListElement.innerHTML = '';
	//pre tutti regali...
	for(let i = 0; i< gifts.length; i++){
		//step 1. creo il codice per un singolo elemento della lista
		const giftElement = createListElement(i);
		// step 2. lo aggancio all lista della paggina
		giftListElement.innerHTML +=  giftElement;
		//step 3. rendo bottoni cliccabili
		setDeleteBtn();
		
	}

  };

  //funzione per creare un elem della lista
  function createListElement(i){
	//restituishe il codice in html  di un gift
	const gift = gifts[i];//quale regalo sto cercando di creare
	 return `
	<div class="gift">
      <div class="gift-info">
         <h3>${gift.name}</h3>
         <p>${gift.description}</p>
      </div>
      <div class="gift_price">${formatCifra(gift.price)}€</div>
      <button class="gift_btn" data-index="${i}">❌</button>
   </div>
	`
  }
  //adesso dobiamo eliminare elementi
//   funzione che attiva i bottoni di eliminazione
function setDeleteBtn(){
//step 1. recupera tutti bottoni dei regali 
const deleteButons = document.querySelectorAll('.gift_btn');
//step 2. per ogni uno dei bottoni....
	for(let i = 0; i < deleteButons.length; i++ ){
	//step 3. recupero singolo bottone	
	const button = deleteButons[i];

		//step 4 agg adevebìntlistener
		button.addEventListener('click',function(){
			//step 5. individuo index del regalo
			const indexBtn = button.dataset.index;
			console.log(indexBtn);
			//step 6. rimuovo dalla lista gift corrispondente
			removeGift(indexBtn);
		})
	}
}

//funzione elimina gift
function removeGift(index){
	//step 1. rimuovo elemento dalla lista
	gifts.splice(index,1)
	console.log(gifts);
	//step 1/a. riaggiorno lo storage
	localStorage.setItem(local_storage_Key, JSON.stringify(gifts));

	//step 2. ricalcolo totale
	calcolateTotale();

	//step 3. visualizzare in paggina
	mostraGift();
}