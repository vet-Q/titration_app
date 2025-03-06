export namespace main {
	
	export class TCID50Request {
	    dilution_factors: number[];
	    positive_counts: number[];
	    total_wells: number;
	    virus_volume_per_well: number;
	    titer_virus_volume_per_well: number;
	    total_volume_ml: number;
	
	    static createFrom(source: any = {}) {
	        return new TCID50Request(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dilution_factors = source["dilution_factors"];
	        this.positive_counts = source["positive_counts"];
	        this.total_wells = source["total_wells"];
	        this.virus_volume_per_well = source["virus_volume_per_well"];
	        this.titer_virus_volume_per_well = source["titer_virus_volume_per_well"];
	        this.total_volume_ml = source["total_volume_ml"];
	    }
	}
	export class TCID50Response {
	    log_tcid50: number;
	    tcid50: number;
	    tcid50_per_virus: number;
	    stock_volume_ul: number;
	    diluent_volume_ul: number;
	
	    static createFrom(source: any = {}) {
	        return new TCID50Response(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.log_tcid50 = source["log_tcid50"];
	        this.tcid50 = source["tcid50"];
	        this.tcid50_per_virus = source["tcid50_per_virus"];
	        this.stock_volume_ul = source["stock_volume_ul"];
	        this.diluent_volume_ul = source["diluent_volume_ul"];
	    }
	}

}

