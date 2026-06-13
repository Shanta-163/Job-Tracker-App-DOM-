let currentTab = 'all'; 
const tabActive = ['bg-blue-500', 'border-blue-900', 'text-black']; 
const tabInactive = ['bg-transparent', 'text-black', 'border-slate-700']; 

const allContainer = document.getElementById('all-container'); 
const interviewContainer = document.getElementById('interview-container'); 
const rejectedContainer = document.getElementById('rejected-container'); 
const emptyCount = document.getElementById('no-jobs'); 
const availableJobs = document.getElementById('available'); 

function switchTab(tab){ 
    const tabs = ['all', 'interview', 'rejected']; 
    currentTab = tab; 

    for (const t of tabs) { 
        const tabName = document.getElementById('tab-' + t); 
        if(t === tab ){ 
            tabName.classList.remove(...tabInactive); 
            tabName.classList.add(...tabActive); 
        } else{ 
            tabName.classList.remove(...tabActive); 
            tabName.classList.add(...tabInactive); 
        } 
    } 

    const pages = [allContainer, interviewContainer, rejectedContainer]; 
    for (const section of pages) { 
        section.classList.add('hidden'); 
    } 
    
    emptyCount.classList.add('hidden'); 

    
    if(tab === 'all' ){ 
        allContainer.classList.remove('hidden'); 
        if(allContainer.querySelectorAll('.card').length < 1){ 
            emptyCount.classList.remove('hidden'); 
        } 
    } else if(tab === 'interview' ){ 
        interviewContainer.classList.remove('hidden'); 
        if(interviewContainer.querySelectorAll('.card').length < 1){ 
            emptyCount.classList.remove('hidden'); 
        } 
    } else{ 
        rejectedContainer.classList.remove('hidden'); 
        if(rejectedContainer.querySelectorAll('.card').length < 1){ 
            emptyCount.classList.remove('hidden'); 
        } 
    } 
    updateCount(); 
} 

const allCount = document.getElementById('all-count'); 
const interviewCount = document.getElementById('interview-count'); 
const rejectCount = document.getElementById('reject-count'); 


switchTab(currentTab); 


document.addEventListener('click', function(event){ 
    const clickedElement = event.target; 
    const card = clickedElement.closest('.card'); 
    if (!card) return; 
    
    const parent = card.parentNode; 
    const status = card.querySelector('.status'); 

    if(clickedElement.classList.contains('interviewed')){ 
        if(status) status.innerText = 'interviewed'; 
        interviewContainer.appendChild(card); 
      
        switchTab(currentTab); 
    } 
    
    if(clickedElement.classList.contains('reject')){ 
        if(status) status.innerText = 'rejected'; 
        rejectedContainer.appendChild(card); 
        switchTab(currentTab); 
    } 
    
    if(clickedElement.classList.contains('delete')){ 
        parent.removeChild(card); 
        switchTab(currentTab); 
    } 
}); 


function updateCount(){ 
    const totalAll = allContainer.querySelectorAll('.card').length;
    const totalInterview = interviewContainer.querySelectorAll('.card').length;
    const totalReject = rejectedContainer.querySelectorAll('.card').length;

    allCount.innerText = totalAll; 
    interviewCount.innerText = totalInterview; 
    rejectCount.innerText = totalReject; 

   
    if(currentTab === 'all') {
        availableJobs.innerText = totalAll;
    } else if(currentTab === 'interview') {
        availableJobs.innerText = totalInterview;
    } else {
        availableJobs.innerText = totalReject;
    }
   const currentContainer = document.getElementById(`${currentTab}-container`);
   if (currentContainer.querySelectorAll('.card').length < 1) {
    emptyCount.classList.remove('hidden');
   } else {
    emptyCount.classList.add('hidden');
  }

    
} 


updateCount();

