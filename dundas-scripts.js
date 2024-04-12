function checkAlert(){
	alert("This works in Dundas, now it's changed");
}

function criteriaModalFunction(modalHeader, payer, planType, indication, documentTitle, criteria, icon) {
  // Create modal and its child elements
  const modal = document.createElement('div');
  const headerContainer = document.createElement('div');
  const headericon = document.createElement('img');
  const header = document.createElement('div');
  const subtitle = document.createElement('div');
  const subp = document.createElement('p');
  const closeButton = document.createElement('button');
  const body = document.createElement('div');
  const p = document.createElement('p');
  const layer = document.createElement('div');

  // Add content to elements
  header.textContent = modalHeader;
  closeButton.textContent = '×';


  subp.innerHTML = (
    '<table class="data-table">' +
    '<tr><td class="col1">Payer:</td><td class="col2"><div class="ellipsis"><strong>' + payer + '</strong></div></td></tr>' +
    '<tr><td class="col1">Plan Type:</td><td class="col2"><div class="ellipsis"><strong>' + planType + '</strong></div></td></tr>' +
    '<tr><td class="col1">Indication:</td><td class="col2"><div class="ellipsis"><strong>' + indication + '</strong></div></td></tr>' +
    '<tr><td class="col1">Document Title:</td><td class="col2"><div class="ellipsis" title="' + `${documentTitle}` + '"><strong>' + documentTitle + '</strong></div></td></tr>' +
    '</table>'
  );

  p.textContent = criteria;
  headericon.src = icon;


  // Add classes to elements
  modal.className = 'modal-content';
  headericon.className = 'modal-header-icon';
  header.className = 'modal-header';
  subtitle.className = 'modal-subtitle';
  subp.className = 'modal-subtitle-text';
  closeButton.className = 'close-modal';
  body.className = 'modal-body';
  p.className = 'modal-body-text';
  layer.className = 'modal-layer';
  headerContainer.className = 'modal-header-container';

  // Append elements
  modal.appendChild(headerContainer);
  headerContainer.appendChild(headericon);
  headerContainer.appendChild(header);
  headerContainer.appendChild(closeButton);
  body.appendChild(p);
  modal.appendChild(subtitle);
  subtitle.appendChild(subp);
  modal.appendChild(body);
  document.body.appendChild(layer);
  document.body.appendChild(modal);


  // Event listeners for closing modal
  closeButton.addEventListener('click', function() {
    closeModal();
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeModal();
  });

  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none';
    layer.style.display = 'none'; // Hide the layer
  }

  // Event listener for layer click
  layer.addEventListener('click', function() {
    closeModal();
  });

  // Display the modal and layer
  modal.style.display = 'block';
  layer.style.display = 'block';
} 


function lengthyFieldCheck(field, replacement) {
  // Check if the field meets any of the specified conditions
  if (field === "No Policy" || field === "No PA Form" || field === "Unspecified" || field === "" || field === "No") {
    let imageElement = event.target.closest('.verbatim');
    // Hide the image if it exists
    if (imageElement) {
      imageElement.style.display = 'none';
    }
  }
}


function policyLink(docID, assetRevisionID) {
  var url = 'https://portal.policyreporter.com/geturlupdate.php?urlid='+ docID + '&updateid=' + assetRevisionID;
  window.open(url, '_blank');
}

function revisionLink(assetRevisionID) {
  var url = 'https://portal.policyreporter.com/policy-updates/' + assetRevisionID;
  window.open(url, '_blank');
}


function checkPrevAssetRev(element, previousAssetRevisionID) {
  if (previousAssetRevisionID === 'Unknown') {
    element.style.display = 'none';
  }
}

function externalLink(url) {
  window.open(url, '_blank');
}

function updateIconOnChange(element, change) {  
  if (change === "Revised") {
    element.src = "/Resource/GetImageResource/?resourceId=faee23fd-da3b-45ee-adaf-a8383a8f392b";
  } else if (change === "Added") {
    element.src = "/Resource/GetImageResource/?resourceId=156fd14f-8c4c-429d-9581-bd500e77f239";
  }
}

function updateBackgroundOnChange(element, change) {   
  if (change == 1) {
    element.style.backgroundColor = "#fafa75";
  } else if (changeInpolicyId == 2){
    element.style.backgroundColor = "#baf0b9";
  }
}

function checkPAFormIcon(paDocID, DocID, URL, coverageCriteria, indication, payer, planType, documenTitle, icon, modalHeader) {
  if (paDocID === " " || paDocID === "(All)") {
    // Find the closest ancestor with the class 'content' for the current image
    let contentDiv = event.target.closest('.content');

    if (contentDiv) {
      // Escape single quotes in coverageCriteria for safe embedding
      coverageCriteria = coverageCriteria.replace(/'/g, "\\'").replace(/\n/g, '\\n');

      contentDiv.style.cssText = "margin-bottom: -15px; margin-top: 0px; vertical-align: middle; display: table;";
      contentDiv.innerHTML = `
<div class="content" style="display: inline-table; margin-top: 10px">
<img class="icons" src="/Resource/GetImageResource/?resourceId=d49da2d7-0b9d-4f3a-9096-bffa8f92c279" style="cursor: pointer;" onClick="externalLink('${URL}')"  ontouchend="externalLink('${URL}')">
<img class="icons" src="/Resource/GetImageResource/?resourceId=27e427e0-903a-4104-abe0-712983e3f76c" style="cursor: pointer;" onClick="revisionLink('${DocID}')" ontouchend="revisionLink('${DocID}')">
<img class="icons" src="/Resource/GetImageResource/?resourceId=91698da0-6345-4286-9953-766f03247873" style="cursor: pointer;" onClick="criteriaModalFunction('${modalHeader}', '${payer}', '${planType}', '${indication}', '${documenTitle}', '${coverageCriteria}', '${icon}')">
<img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='checkAndHide(this, "${documenTitle}")'>
<div style="display: table-row">
`;
    }
  }
}

function checkPAHyperlink(paDocID, policyDocID, policyAssetRevId, policyTitle, paAssetRevId, paTitle) {
  if (paDocID === " ") {
    // Find the closest ancestor with the class 'content' for the current image
    let contentDiv = event.target.closest('.content');

    if (contentDiv) {
      contentDiv.style.cssText = "margin-bottom: -21px; margin-top: 0px; vertical-align: middle; display: grid; gap: 3px;";
      contentDiv.innerHTML = `
<a href="https://portal.policyreporter.com/geturlupdate.php?urlid=${policyDocID}&updateid=${policyAssetRevId}" target="_blank" class="hyperlink" style="cursor: pointer; text-align: left;">
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" onLoad="addDisabledAttribute(this, '${policyTitle}')">
<span>&nbsp; ${policyTitle}
</span>
</a>
</div>
<div style="display: grid;">
`;
      let bodyRow = contentDiv.closest('tr');
      let headerRow = document.querySelector(`div[id="54d850c4-6b7a-c50b-4a10-48eb16b2a66f"] table.row-header-table tr:nth-child(${bodyRow.rowIndex+1})`);
    }
  }
}

function addDisabledAttribute(imgElement, url) {
  if (url === 'No Policy' || url === ' ') {
    const anchorElement = imgElement.closest('a');
    anchorElement.removeAttribute('href');
    anchorElement.classList.add('disabled-link');
    anchorElement.style.color = '#666666';
    anchorElement.style.cursor = 'default';
  }
}

function checkAndHide(element, field) {
  if (field === 'No Policy' || field === ' ') {
    var parentDiv = element.closest('.content');
    if (parentDiv) {
      parentDiv.style.display = 'none';
    }
  }
}

function checkMedCoverage(element, docId) {
  if (docId === "No Policy" || docId === " ") {
    element.style.display = "none";
  }
};

function checkRxPopup(element, productId, pbmId, controllerId, planTypeId) {
  if (productId === " " || pbmId === " " || controllerId === " " || planTypeId === " ") {
    element.style.display = "none";
  }
};

function postMessageJS(productSelected,pbmSelected, payersSelected, plantypeSelected) {
  productSelected = Number(productSelected.replace(",", ""));
  pbmSelected = Number(pbmSelected.replace(",", ""));
  payersSelected = Number(payersSelected.replace(",", ""));
  plantypeSelected = Number(plantypeSelected.replace(",", ""));
  let contentDiv = event.target.closest('.content0');
  let rowIndex = contentDiv.closest('td').getAttribute('rowindex');
  let newStatecell = document.querySelector(`[id="2158db85-9136-48bf-ca46-72f489f803a5"] > div.dataGrid > div.innerDiv > div.datagrid-view > div.datagrid-body > table > tr > td[rowindex='${rowIndex}'][colindex='0'] .gridCellTextTemplate`);
  let statesSelected = newStatecell.innerHTML

  var message = {
    modal: 'formulary-popup',
    data: {
      productID: productSelected,
      controllerID: payersSelected,
      pbmID: pbmSelected,
      planTypeID: plantypeSelected,
      stateIDs: statesSelected.split(',').map(state => state.trim())
    }
  };

  window.parent.postMessage(message, '*');
  console.log(message);
}

