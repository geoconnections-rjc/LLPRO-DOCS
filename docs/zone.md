# Zone

Use this page to create a new zone within the selected Zone Group. An unlimited number of zones are allowed. 

## Zone Name


* **Name** Name the zone currently being designed. An unlimited number of zones are allowed.


## Load Profile

* <span class="term">Days Occupied Per Week</span> The days per week of building occupancy. If the building has periods of partial occupancy, these should be entered as a weighted average.
    * For example, if a building is occupied 8 hours per day Monday through Friday and 4 hours on Saturday, a value of 5.5 days per week is recommended. 
Zone load entry will depend on the input method chosen:

* **Simple Load Entry(Design Day)** Manual Entry Only
* **Monthly Load Entry** Import or Manual Entry
* **Hourly Load Entry** Import Only

### Simple Load Entry: Design Day
Design day load data is the minimum information required to perform GHEX design length calculations. Enter the heating and cooling loads for each time block increment. The most critical values will be the peak loads placed in the time block in which they occur. Accuracy is not as critical for the loads in off-peak time blocks as they will simply be used to calculate the system part-load factor. The recommended entries in the off-peak time blocks will be the **AVERAGE** heating and cooling loads in each respective time period.

* **<span class="heating">HEATING MODE LOAD ENTRY</span>** Enter loads in the <span class="heating">HEATING COLUMN</span> to account for peak heating and annual ground loads for the current **Zone** according to the time block in which they occur.
    * The most critical values will be the peak loads placed in the time block in which they occur.
    * Enter the average <span class="heating">HEATING</span> loads in the remaining (three) time blocks.
* **<span class="cooling">COOLING MODE LOAD ENTRY</span>** Enter loads in the <span class="cooling">COOLING COLUMN</span> to account for peak cooling and annual ground loads for the current **Zone** according to the time block in which they occur.
    * The most critical values will be the peak loads placed in the time block in which they occur.
    * Enter the average <span class="cooling">COOLING</span> loads in the remaining (three) time blocks. 
* **Equivalent Full Load Run Hours** The number of hours the zone would have to be under peak heating/cooling load conditions for the system to add/remove the equivalent amount of heat energy to meet its annual heating/cooling requirements (Peak Load (Btu/hr) x EFLH (hr) = Energy Added/Removed (Btu)).
    * This input is used to determine annual ground loads and can be used as an alternative to a detailed hour-by-hour building analysis.


*For more information on EFLH values for various locations, building types and occupancy patterns, refer to Table 8 in Chapter 34, page 18 in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications").*

### Monthly Load Entry
Monthly load data is an intermediate data set to perform GHEX design length calculations. You may manually enter monthly load data or import it (.CSV). 
##### Manual Entry
* **Total Cooling** The total amount of heat energy (kBtu or kWh) that must be removed from the space in cooling to maintain the space t-stat set point.
    * Enter the value for each respective month. **LoopLink PRO** will use the annual sum and to calculate values for annual EFLH in cooling mode.
    * The values entered should be the monthly cooling energy requirements for the equipment (which include duct/distribution system losses, ventilation, etc. when appropriate) but should not include compressor energy from the GSHP units themselves (i.e. - heat removed from space, not heat of rejection).
* **Peak Cooling** The peak cooling load for each month. **LoopLink PRO** will find the month where peak cooling load occurs and use it for the design day analysis.
* **Total Heating** The total amount of heat energy (kBtu or kWh) that must be added to the space in heating to maintain the space t-stat set point.
    * Enter the value for each respective month. **LoopLink PRO** will use the annual sum and to calculate values for annual EFLH in heating mode.
    * The values entered should be the monthly heating energy requirements for the equipment (which include duct/distribution system losses, ventilation, etc. when appropriate) but should not include compressor energy from the GSHP units themselves (i.e. - heat added to space, not heat of extraction).
* **Peak Heating** The peak heating load for each month. **LoopLink PRO** will find the month where peak heating load occurs and use it for the design day analysis.
* **Percentage of Peak** Specify the appropriate percentage (compared to the peak value) for the heating and cooling loads in each time block increment.
    * The most critical values will be entered in the time block in which the peak values occur (100%).
    * Accuracy is not as critical for the percentage values in off-peak time blocks as they will simply be used to calculate the system part-load factor.
    * The recommended entries in the off-peak time blocks will be the percentage that corresponds with the **AVERAGE** heating and cooling loads in each respective time period.

##### Import (.CSV)
You may import monthly loads via a Trane **TRACE 700** [GT file](http://www.trane.com/commercial/north-america/us/en/products-systems/design-and-analysis-tools/c-d-s--help/cds-software-news/march-2008.html "Trane TRACE 700") report (must be in .CSV format).

* **Percentage of Peak** After importing monthly loads, you must specify the appropriate percentage (compared to the peak value) for the heating and cooling loads in each time block increment.
    * Be sure to enter the percentages according to the time block in which the loads occur. In multi-zone projects, **LoopLink PRO** will use this information to determine the maximum heating and cooling loads for the GHEX design. 
    * The most critical values will be entered in the time block in which the peak values occur (100%).
    * Accuracy is not as critical for the percentage values in off-peak time blocks as they will simply be used to calculate the system part-load factor.
    * The recommended entries in the off-peak time blocks will be the percentage that corresponds with the **AVERAGE** heating and cooling loads in each respective time period.

### Hourly Load Entry - Import Only (.CSV)
Monthly load data is an advanced data set to perform GHEX design length calculations.

* The only method of adding hourly load data is to import it.
* A properly formatted file would be saved in .CSV format and have 8760 lines of data in two columns (first column = <span class="cooling">COOLING LOADS</span>, second column = <span class="heating">HEATING LOADS</span>).

## Equipment Selection

###Simple Equipment Entry
With this method, only basic inputs of equipment capacity and efficiency are needed. Equipment selection tables are hidden.

* **Connected Flow** The nominal flow rate for the specified equipment. In closed-loop applications, flow rates of 2.5-3.0 gpm per ton are typical.
    * This field will only appear if **Connected** is the chosen **Flow Analysis Mode** for the **Zone Group**.
* **Cooling Cap** The total cooling capacity of the specified equipment for a given set of operating conditions.
    * Equipment performance is a function of loop EWT, water flow, air flow and entering load side air/water temperatures.
* **Sensible Capacity Ratio (SCR)** The equipment's ratio of sensible cooling capacity to its total cooling capacity, expressed as a decimal.
    * For example, a SCR=0.75 indicates that 75% of the selected unit's total cooling capacity is attributed to sensible cooling and the remaining 25% being attributed to latent cooling.
    * Typical SCR values range from 0.75-0.78 under normal operating conditions for GSHP equipment.  
* **EER** The efficiency of the specified equipment in cooling mode, defined to be its **Total Cooling Capacity** (Btu/hr) divided by **Electrical Demand** (Watts).
* **Heating Cap** The heating capacity of the specified equipment for a given set of operating conditions.
    * Equipment performance is a function of loop EWT, water flow, air flow and entering load side air/water temperatures.
* **COP** The efficiency of the specified equipment in heating mode, defined to be its **Heating Capacity** (Btu/hr) divided by **Electrical Demand** (converted to Btu/hr, 3,412 Btu/hr = 1 kW).

*For detailed discussion on factors that affect heat pump performance, refer to Section 2.3.3 (Chapter 2, pages 16-18) in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore")*

###Detailed Equipment Entry
With this method, the simple heat pump entry fields are hidden. An unlimited number of different make/models of GSHP units are allowed in a single zone.

* Specify whether a **Water-Air** or **Water-Water** unit will be added to the zone. Note that chillers are found in the **Water-Water** category.
    * Use the provided filters to find the appropriate model.
    * Once a model has been selected, specify the quantity to add to the zone.
    * Use the provided sliders to adjust GSHP performance based on the desired operating conditions - source flow (gpm), entering load air/water temperatures, and load flow (cfm or gpm).
    * Save the selection to apply it to the zone.
    * Once a model has been added to the zone, you may add another or move on to the next task in the project.

## Calculation Results

Calculation results are displayed in the left-hand output panel:

* Cooling mode calculation results are highlighted in **<span class="cooling">BLUE</span>**.
* Heating mode calculations results are highlighted in **<span class="heating">YELLOW</span>**.
* Note that when an input is changed, the calculation results will not display on screen until the page is saved.
* Individual **Zone** outputs are shown on the top-half of the left-hand output panel. The aggregate **Zone Group** outputs (which include all space conditioning and hot water zone loads) are shown on the bottom-half of the output panel.

## Zone Design Day

View the loads (by time block) for the current **Zone** according to the information entered.

* **<span class="heating">HEATING LOAD BY TIME BLOCK</span>** The specified heating loads (by time block) for the current **Zone**.
* **<span class="cooling">COOLING LOAD BY TIME BLOCK</span>** The specified cooling loads (by time block) for the current **Zone**.
* **Full Load Run Hours** The specified value for FLRHs in the current **Zone**.

## Zone Equipment


* **Total Capacity** The calculated heating/cooling capacity for the equipment specified in the current **Zone**.
* **Sensible Capacity** The calculated sensible cooling capacity for the equipment specified in the current **Zone** (does not apply to heating).
* **Total Sizing** The percentage of peak load that the specified equipment will be capable of covering for the current **Zone**.
    * A value less than 100% indicates that the equipment is undersized relative to the peak load.
* **Efficiency** The calculated cooling EER and heating COP for the equipment specified in the current **Zone**.
* **Demand** The calculated electrical demand for the equipment specified in the current **Zone**.

## Zone Group Design Day

View the aggregate loads for the active **Zone Group**.

* **<span class="heating">HEATING LOAD BY TIME BLOCK</span>** The calculated heating loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* **<span class="cooling">COOLING LOAD BY TIME BLOCK</span>** The calculated cooling loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* **Full Load Run Hours** The weighted average value for FLRHs, which considers all active space conditioning and hot water zones in the **Zone Group**.

## Zone Group Equipment

* **Total Capacity** The calculated heating/cooling capacity for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* **Sensible Capacity** The calculated sensible cooling capacity for all equipment specified in the active space conditioning zones in the **Zone Group** (does not apply to heating).
* **Total Sizing** The percentage of peak load that the specified equipment will be capable of covering for the active space conditioning and hot water zones in the **Zone Group**.
    * A value less than 100% indicates that the equipment is undersized relative to the peak load.
* **Efficiency** The calculated cooling EER and heating COP for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* **Demand** The calculated electrical demand for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
