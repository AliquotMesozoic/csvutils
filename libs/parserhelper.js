/*
 * Creates a table with the given size that can be filled with elements
 *
 */

function parseString(str) {
    if (str.match(/\d/) != null){
        return parseFloat(str.match(/[\d.]+/)[0]);
    } else {
        return "";
    }
}

function parseRow(row) {
    var cells = [];
    row.forEach(function(str){
        cells.push(parseString(str));
    });
}

function Table(data){
    if (typeof data !== "object") {
        throw new Error("Data must be in the form of an Array");
    }
    this.numRows = data.length;
    this.numCols = 0;
    
    this.attributes = attributes;
    
    this.table = {
        "raw": [],
        "parsed": []
    };
    
    for (var row=0; row < data.length; row++){
        if (typeof data[row] === "object" && data[row] !== null){
            this.table.raw.push(data[row]);
            this.table.parsed.push(parseRow(data[row]));
            
            if (data[row].length > this.numCols) {
                numCols = data[row].length;
            }
        } else if (data[row] === null){
            var temp = new Array(this.numCols).join("<br> ").split(" ");
            this.table.raw.push(temp);
            this.table.parsed.push(temp);
        } else if (typeof data[row] === "string"){
            var temp = new Array(this.numCols).join("<br> ").split(" ");
            temp[0] = data[row];
            this.table.raw.push(temp);
            this.table.parsed.push(temp);
        }
    }
}

Table.prototype.addRow = function(content){
    this.table.raw.push(content);
    this.table.parsed.push(parseRow(content));
}

Table.prototype.getRow = function(row){
    return {"raw":this.table.raw[row], "parsed":this.table.parsed[row]};
}

Table.prototype.getValue(row, col){
    var row = this.getRow(row);
    return {"raw":row.raw[col],"parsed":row.parsed[col]};
}

Table.prototype.constructHTML(){
    this.html = "";
    for (var row=0; row < this.table.raw.length; row++){
        this.html += "<tr>";
        for (var col=0; col < this.table.raw[row].length; col++){
            this.html += "<td>" + this.table.raw[row][col] + "</td>";
        }
        this.html += "</tr>";
    }
}

Table.prototype.appendTo(element){
    this.constructHTML();
    $(element).append(this.html);
}