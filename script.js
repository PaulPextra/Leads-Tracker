let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

inputBtn.addEventListener("click", function() {
	myLeads.push(inputEl.value);
	inputEl.value = "";
	localStorage.setItem("myLeads", JSON.stringify(myLeads));
	render(myLeads);
})

function render(leads) {
	let leadItems = "";
	for (let i = 0; i < leads.length; i++) {
		leadItems += `
			<li>
				<a target="_blank" href="${leads[i]}">
					${leads[i]}
				</a>
			</li>
		`;
	}

	ulEl.innerHTML = leadItems;
}

tabBtn.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function() {
		myLeads.push(tabs[0].url);
		localStorage.setItem("myLeads", JSON.stringify(myLeads));
		render(myLeads);
	});
})

deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear();
	myLeads = [];
	render(myLeads);
})

let leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads));
if (leadsFromLocalStorage) {
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}