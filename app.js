function getPlots(id) {
    //Read Samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
           
            var result = sampledata.samples.filter(sample => sample.id.toString() === id);
            console.log(result)
            var ids = result[0].otu_ids;
            console.log(ids)
            var sampleValues = result[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  result[0].otu_labels.slice(0,10);
            console.log (labels)
        // Top 10 OTU IDs for the Bar Plot OTU and Reversing it. 
            var OTUtop = ( result[0].otu_ids.slice(0, 10)).reverse();
        // OTU ID's to the Desired Form for the Plot
            var OTUid = OTUtop.map(d => "OTU" + d);
            console.log(`OTU IDS: ${OTUid}`)
         // Top 10 Labels for the Plot
            var labels =  result[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTUid,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // Create a Data Variable
            var data = [trace];
    
            // Create Variable for the layout - "Title", "Margin", "Y Axis"
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 20,
                    t: 50,
                    b: 20
                }
            };
    
        // Create Bar Plot Using Plotly
        Plotly.newPlot("bar", data, layout);
            // Create Bubble Chart
            var trace1 = {
                x: result[0].otu_ids,
                y: result[0].sample_values,
                mode: "markers",
                marker: {
                    size: result[0].sample_values,
                    color: result[0].otu_ids
                },
                text:result[0].otu_labels
    
            };
    
            // Create Variable for the Layout of the Bubble Chart
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1200
            };
    
            // Create Variable for Data
            var data1 = [trace1];
    
        // Create Bubble Chart Using Plotly
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Create Function to Grab the Data
    function getDemoInfo(id) {
    // Read the Samples.json file to get the Data
        d3.json("samples.json").then((data)=> {
    // Create Variable to Get the Meta Data
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // Filter Meta Data by ID
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // Create Variable to Select Demographic Block
           var demographicInfo = d3.select("#sample-metadata");
            
         // Clear Demographic Information
           demographicInfo.html("");
    
         // Take the Demographic Data for the ID and Append the Information to the Panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // Create a Function for the Change Event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Create Funtion for the Dropdown
    function init() {
        // Grab Dropdown Menu
        var dropdown = d3.select("#selDataset");
    
        // Read the Samples.json file to get the Data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // IDs to the Dropdown Menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // Display to the Page
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();