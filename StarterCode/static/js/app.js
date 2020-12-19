//submit repository and web links
var names = [];
var metadata = [];
var samples = []

d3.json("samples.json").then((data) => {
    console.log(data);
    // add the dropdown options for all the participants
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    var selOption = d3.select("#selDataset");  // capture input for change and value changed to

    Object.entries(names).forEach(([index, name])=> {
        var cell = selOption.append("option");    // create option element
        cell.text(name);  
    });  // update text of the option element
    setDemographic(940);
    barPlot(940);
    bubbleChart(940);
    
});

function setDemographic(selectedId){
    console.log("selectedID:", metadata);   
    var personalData = metadata.filter(function(person){  // parse the data
        return person.id == selectedId;
    });
    //console.log("personal data:", personalData);
    console.log("selected22222:", personalData);
    var id = personalData[0].id;
    var ethnicity = personalData[0].ethnicity;
    var gender = personalData[0].gender;
    var age = personalData[0].age;
    var location = personalData[0].location;
    var bbtype = personalData[0].bbtype;
    var wfreq = personalData[0].wfreq;

    // Then, select the unordered list element by class name
    var list = d3.select("#sample-metadata");

    // remove any children from the list to
    list.html("");

    // append stats to the list
    list.append("h5").text(`id: ${id}`);
    console.log("id:", id)
    list.append("h5").text(`ethnicity: ${ethnicity}`);
    list.append("h5").text(`gender: ${gender}`);
    list.append("h5").text(`age: ${age}`);
    list.append("h5").text(`location: ${location}`);
    list.append("h5").text(`bbtype: ${bbtype}`);
    list.append("h5").text(`wfreq: ${wfreq}`);
}

// reference   https://plot.ly/javascript/
function optionChanged(selected) {
    console.log("selected55:", selected);
    setDemographic(selected);
    barPlot(selected);
    bubbleChart(selected);
};  

// updates the html page index.html with the raw data when page is loaded
// and also updates html page with filtered data

// // create horizontal bar chart
function barPlot(selectedId){
    var sampleData = samples.filter(function(sample){  // parse the data
        return sample.id == selectedId;
    });
    
    otu = sampleData[0].otu_ids.slice(0,10);
    otu = otu.map(id => `OTU  ${id}`);
    otu = otu.reverse();
    samp_values = sampleData[0].sample_values.slice(0,10);
    samp_values = samp_values.reverse();
    console.log(otu);
    console.log(samp_values);

    var trace = {
        x: samp_values,
        y: otu,
        type: 'bar',   // line, scatter = mode:”markers”
        orientation: 'h',
          }
    var layout = {
        title: 'Top 10 OTUs',
        }
    Plotly.newPlot("bar", [trace], layout);
};


// create bubble chart

//https://images.plot.ly/plotly-documentation/images/plotly_js_cheat_sheet.pdf?_ga=2.115454466.525573211.1607557400-742152575.1603234155

function bubbleChart(selectedId){
    var sampleData = samples.filter(function(sample){  // parse the data
        return sample.id == selectedId;
    });
    otu = sampleData[0].otu_ids;
    samp_values = sampleData[0].sample_values;
    text = otu.map(id => `OTU  ${id}`);

    var trace1 = {
        x: otu,
        y:samp_values,
        mode:'markers',
        text: text,
        marker: {
            color: otu,
            colorscale: 'Jet',
            type: 'heatmap',
            //opacity: otu.map(id => 0.7),
            size: samp_values
        }
    };

    var layout = {
        title: '',
        showlegend: false,
        height: 600,
        width: 1250
      };

    Plotly.newPlot('bubble', [trace1], layout);
}



// ------
// trace2 = {
//     x:[],
//     y:[],
//     marker:{
//         color:['red','blue'],
//         size:[]},
//         mode:'markers'};

//         Plotly.newPlot("bubble", data, layout)
// -------
// . Create a bubble chart that displays each sample.
// * Use `otu_ids` for the x values.
// * Use `sample_values` for the y values.
// * Use `sample_values` for the marker size.
// * Use `otu_ids` for the marker colors.
// * Use `otu_labels` for the text values.



// Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

// ++++++
// function filteredIndividual (individual) {
//     return individual.
// }
// +++++
// Update all of the plots any time that a new sample is selected.
// Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:


// gauge charts https://plotly.com/javascript/gauge-charts/
