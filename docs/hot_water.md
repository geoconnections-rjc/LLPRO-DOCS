# HOT WATER

Use this page to create a new hot water generation zone within the selected Zone Group. An unlimited number of hot water zones are allowed. Water-water heat pumps (as well as non-reversible water source units) are viable options for hot water generation when required temperatures are below 120&deg;F, although some may be able to reach hot water delivery temperatures up to 140&deg;F. Consult with the manufacturer for more information.

## HOT WATER ZONE NAME


* **Name** Name the hot water zone currently being designed. An unlimited number of hot water zones are allowed.

## PEAK BLOCK HOT WATER GENERATION

Enter the hot water demand rates for each time block increment. **The most critical values will be the maximum hot water generation loads placed in the time block in which they occur.**  Accuracy is not as critical for the loads in off-peak time blocks as they will simply be used to calculate the system part-load factor. The recommended entries in the off-peak time blocks will be the **AVERAGE** hot water demand rates in each respective time period.



* **<span style="background:#FEF1E1; margin:1px;">&nbsp;HEATING MODE HOT WATER DEMAND ENTRY&nbsp;</span>** Enter hot water loads in the <span style="background:#FEF1E1; margin:1px;">&nbsp;HEATING COLUMN&nbsp;</span> to account for added peak heating demand and annual ground loads due to concurrent operation of the hot water generation and space conditioning (heating) system.
    * Doing so will increase heating GHEX design lengths for heating dominant applications.
    * From a design standpoint, it is most conservative to give the hot water generation system full benefit when heating is the critical load requirement. 
* **<span style="background:#DFE8F1; margin:1px;">&nbsp;COOLING MODE HOT WATER DEMAND ENTRY&nbsp;</span>** Enter hot water loads in the <span style="background:#DFE8F1; margin:1px;">&nbsp;COOLING COLUMN&nbsp;</span> to account for reduced peak cooling demand and annual ground loads due to concurrent operation of the hot water generation and space conditioning (cooling) system.
    * Doing so will decrease cooling GHEX design lengths for cooling dominant applications.
    * From a design standpoint, it is most conservative to give the hot water generation system zero benefit when cooling is the critical load requirement. 

*For more information on determining peak hot water demand rates for various types of buildings, refer to Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications"), specifically:*

* **Table 7 (page 50.14)** Hot-Water Demands and Use for Various Types of Buildings
* **Table 10 (page 50.20)** Hot-Water Demand per Fixture for Various Types of Buildings

## AVERAGE GENERATED VOLUME


### Simple Hot Water Consumption Entry
With this mode selected, the **Detailed Monthly Hot Water Volume** inputs are hidden.

* **Average Monthly Consumption** The predicted **AVERAGE** monthly hot water consumption for the zone, which is used to determine the annual energy requirements for the hot water zone as well as its associated heating ground load.
* **Months per Year** The number of months that the hot water generation system will operate. For example, a school typically operates 9 months in a year whereas a hotel operates year round.
* **Standing/Distribution Losses (% of Total)** The amount of heat lost from the hot water system through the storage and distribution piping components of the system, expressed as a percentage.
    * According to Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications"), *"Energy losses from hot-water distribution systems usually amount to at least 10-20% of total hot-water system energy use, and are often as high as 50%; losses of over 90% have been found in some installations."*
    * Proper hot-water distribution system design is extremely important.

### Detailed Hot Water Consumption Entry
With this mode selected, the **Average Monthly Consumption** and **Months per Year** inputs are hidden.

* **Detailed Hot Water Consumption Entry Mode** Enter the predicted **AVERAGE** volume of hot water used for each month of the year. 
* **Standing/Distribution Losses (% of Total)** The amount of heat lost from the hot water system through the storage and distribution piping components of the system, expressed as a percentage.
    * According to Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications"), *"Energy losses from hot-water distribution systems usually amount to at least 10-20% of total hot-water system energy use, and are often as high as 50%; losses of over 90% have been found in some installations."*
    * Proper hot-water distribution system design is extremely important.

## OPERATING CONDITIONS


* **Capacity** The capacity of the GSHP equipment being used for hot water generation, which must be large enough to meet the instantaneous load.
    * *For more information on sizing refrigeration-based water heaters, refer to Page 50.27 in Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications")*
* **Connected Flow** The required loop (source-side) flow rate for proper heat pump operation.
    * In closed-loop applications, flow rates of 2.5-3.0 gpm per ton are typical.
    * This field will only appear if **Connected** is the chosen **Flow Analysis Mode** for the **Zone Group**.
* **COPavg** The average heating efficiency of the hot water generation equipment, which is used to calculate the heat of extraction rate from the GHEX during hot water system operation.
* **Inlet Temperature** The temperature of the water entering the system before being heated.
    * A good first estimate for inlet water temperature is the local ground temperature. 
* **Setpoint Temperature** The desired heated water temperature to supply to the space.
    * Water-water heat pumps (as well as non-reversible water source units) are viable options for hot water generation when required temperatures are below 120&deg;F, although some may be able to reach hot water delivery temperatures up to 140&deg;F.
    * Consult with the manufacturer for more information.

## CALCULATION RESULTS

Calculation results are displayed in the left-hand output panel:

* Cooling mode calculation results are highlighted in **<span style="background:#DFE8F1; margin:1px;">&nbsp;BLUE&nbsp;</span>**.
* Heating mode calculations results are highlighted in **<span style="background:#FEF1E1; margin:1px;">&nbsp;YELLOW&nbsp;</span>**.
* Note that when an input is changed, the calculation results will not display on screen until the page is saved.
* Individual **Zone** outputs are shown on the top-half of the left-hand output panel. The aggregate **Zone Group** outputs (which include all space conditioning and hot water zone loads) are shown on the bottom-half of the output panel.

## HEAT ENERGY BY TIMEBLOCK

View the calculated loads (by time block) for the current **Hot Water Zone** according to the hot water generation rates entered.

* **<span style="background:#FEF1E1; margin:1px;">&nbsp;HEATING LOAD BY TIME BLOCK&nbsp;</span>** The calculated heating load increase (by time block) due to specified rate of hot water generation for the current **Hot Water Zone**.
    * This load will effectively increase the total heating load for the **Zone Group** as well as the associated GHEX design lengths. 
* **<span style="background:#DFE8F1; margin:1px;">&nbsp;COOLING LOAD BY TIME BLOCK&nbsp;</span>** The calculated cooling load reduction (by time block) due to specified rate of hot water generation (due to concurrent cooling mode operation) for the current **Hot Water Zone**.
    * This load will effectively decrease the total cooling load for the **Zone Group** as well as the associated GHEX design lengths. 

## HWG INFO


* **Ground Energy** The amount of heat energy extracted from the ground due to hot water system operation for the current **Hot Water Zone**.
* **Water Volume** The calculated volume of hot water generated annually for the current **Hot Water Zone**.

## ZONE GROUP DESIGN DAY

View the aggregate loads for the active **Zone Group**.

* **<span style="background:#FEF1E1; margin:1px;">&nbsp;HEATING LOAD BY TIME BLOCK&nbsp;</span>** The calculated heating loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* **<span style="background:#DFE8F1; margin:1px;">&nbsp;COOLING LOAD BY TIME BLOCK&nbsp;</span>** The calculated cooling loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* **Full Load Run Hours** The weighted average value for FLRHs, which considers all active space conditioning and hot water zones in the **Zone Group**.

## ZONE GROUP EQUIPMENT


* **Total Capacity** The calculated heating/cooling capacity for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* **Sensible Capacity** The calculated sensible cooling capacity for all equipment specified in the active space conditioning zones in the **Zone Group** (does not apply to heating).
* **Total Sizing** The percentage of peak load that the specified equipment will be capable of covering for the active space conditioning and hot water zones in the **Zone Group**.
    * A value less than 100% indicates that the equipment is undersized relative to the peak load.
* **Efficiency** The calculated cooling EER/heating COP for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* **Demand** The calculated electrical demand for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.