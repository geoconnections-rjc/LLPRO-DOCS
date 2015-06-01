# Hot Water

Use this page to create a new hot water generation zone within the selected Zone Group. An unlimited number of hot water zones are allowed. Water-water heat pumps (as well as non-reversible water source units) are viable options for hot water generation when required temperatures are below 120&deg;F, although some may be able to reach hot water delivery temperatures up to 140&deg;F. Consult with the manufacturer for more information.

## Hot Water Zone Name
* <span class="term">Name</span> Name the hot water zone currently being designed. An unlimited number of hot water zones are allowed.

## Peak Block Hot Water Generation

Enter the hot water demand rates for each time block increment. **The most critical values will be the maximum hot water generation loads placed in the time block in which they occur.**  Accuracy is not as critical for the loads in off-peak time blocks as they will simply be used to calculate the system part-load factor. The recommended entries in the off-peak time blocks will be the **AVERAGE** hot water demand rates in each respective time period.

* <span class="term">HEATING MODE HOT WATER DEMAND ENTRY</span> Enter hot water loads in the <span class="heating">HEATING COLUMN</span> to account for added peak heating demand and annual ground loads due to concurrent operation of the hot water generation and space conditioning (heating) system.
    * Doing so will increase heating GHEX design lengths for heating dominant applications.
    * From a design standpoint, it is most conservative to give the hot water generation system full benefit when heating is the critical load requirement. 
* <span class="term">COOLING MODE HOT WATER DEMAND ENTRY</span> Enter hot water loads in the <span class="cooling">COOLING COLUMN</span> to account for reduced peak cooling demand and annual ground loads due to concurrent operation of the hot water generation and space conditioning (cooling) system.
    * Doing so will decrease cooling GHEX design lengths for cooling dominant applications.
    * From a design standpoint, it is most conservative to give the hot water generation system zero benefit when cooling is the critical load requirement. 

<div class="resource">
	<h3>Additional Resource</h3>
	<p>For more information on determining peak hot water demand rates for various types of buildings, refer to Chapter 50 - Service Water Heating in the <a href="https://www.ashrae.org/resources--publications/handbook">ASHRAE HVAC Applications Handbook (2011)</a>, specifically:</p>
	<ul>
		<li><strong>Table 7 (page 50.14)</strong> Hot-Water Demands and Use for Various Types of Buildings</li>
		<li><strong>Table 10 (page 50.20)</strong> Hot-Water Demand per Fixture for Various Types of Buildings</li>
	</ul>
</div>

## Average Generated Volume

### Simple Hot Water Consumption Entry
With this mode selected, the **Detailed Monthly Hot Water Volume** inputs are hidden.

* <span class="term">Average Monthly Consumption</span> The predicted **AVERAGE** monthly hot water consumption for the zone, which is used to determine the annual energy requirements for the hot water zone as well as its associated heating ground load.
* <span class="term">Months per Year</span> The number of months that the hot water generation system will operate. For example, a school typically operates 9 months in a year whereas a hotel operates year round.
* <span class="term">Standing/Distribution Losses (% of Total)</span> The amount of heat lost from the hot water system through the storage and distribution piping components of the system, expressed as a percentage.
    * According to Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications"), *"Energy losses from hot-water distribution systems usually amount to at least 10-20% of total hot-water system energy use, and are often as high as 50%; losses of over 90% have been found in some installations."*
    * Proper hot-water distribution system design is extremely important.

### Detailed Hot Water Consumption Entry
With this mode selected, the **Average Monthly Consumption** and **Months per Year** inputs are hidden.

* <span class="term">Detailed Hot Water Consumption Entry Mode</span> Enter the predicted **AVERAGE** volume of hot water used for each month of the year. 
* <span class="term">Standing/Distribution Losses (% of Total)</span> The amount of heat lost from the hot water system through the storage and distribution piping components of the system, expressed as a percentage.
    * According to Chapter 50 - Service Water Heating in the [ASHRAE HVAC Applications Handbook (2011)](https://www.ashrae.org/resources--publications/handbook "ASHRAE Publications"), *"Energy losses from hot-water distribution systems usually amount to at least 10-20% of total hot-water system energy use, and are often as high as 50%; losses of over 90% have been found in some installations."*
    * Proper hot-water distribution system design is extremely important.

## Operating Conditions

* <span class="term">Capacity</span> The capacity of the GSHP equipment being used for hot water generation, which must be large enough to meet the instantaneous load.

<div class="resource">
	<h3>Additional Resource</h3>zone Copy
	<p>For more information on sizing refrigeration-based water heaters, refer to Page 50.27 in Chapter 50 - Service Water Heating in the <a href="https://www.ashrae.org/resources--publications/handbook">ASHRAE HVAC Applications Handbook (2011)</a>.</p>
</div>

* <span class="term">Connected Flow</span> The required loop (source-side) flow rate for proper heat pump operation.
    * In closed-loop applications, flow rates of 2.5-3.0 gpm per ton are typical.
    * This field will only appear if **Connected** is the chosen **Flow Analysis Mode** for the **Zone Group**.
* <span class="term">COP<sub>avg</sub></span> The average heating efficiency of the hot water generation equipment, which is used to calculate the heat of extraction rate from the GHEX during hot water system operation.
* <span class="term">Inlet Temperature</span> The temperature of the water entering the system before being heated.
    * A good first estimate for inlet water temperature is the local ground temperature. 
* <span class="term">Setpoint Temperature</span> The desired heated water temperature to supply to the space.
    * Water-water heat pumps (as well as non-reversible water source units) are viable options for hot water generation when required temperatures are below 120&deg;F, although some may be able to reach hot water delivery temperatures up to 140&deg;F.
    * Consult with the manufacturer for more information.

# Object Summary

The Object Summary is displayed to the left of the main page.

* Cooling mode calculation results are highlighted in **<span class="cooling">BLUE</span>**.
* Heating mode calculations results are highlighted in **<span class="heating">YELLOW</span>**.
* Note that when an input is changed, the calculation results will not display on screen until the page is saved.
* Individual **Zone** outputs are shown on the top-half of the left-hand output panel. The aggregate **Zone Group** outputs (which include all space conditioning and hot water zone loads) are shown on the bottom-half of the output panel.

## Heat Energy by Timeblock

View the calculated loads (by time block) for the current **Hot Water Zone** according to the hot water generation rates entered.

* <span class="term">HEATING LOAD BY TIME BLOCK</span> The calculated heating load increase (by time block) due to specified rate of hot water generation for the current **Hot Water Zone**.
    * This load will effectively increase the total heating load for the **Zone Group** as well as the associated GHEX design lengths. 
* <span class="term">COOLING LOAD BY TIME BLOCK</span> The calculated cooling load reduction (by time block) due to specified rate of hot water generation (due to concurrent cooling mode operation) for the current **Hot Water Zone**.
    * This load will effectively decrease the total cooling load for the **Zone Group** as well as the associated GHEX design lengths. 

## HWG Info


* <span class="term">Ground Energy</span> The amount of heat energy extracted from the ground due to hot water system operation for the current **Hot Water Zone**.
* <span class="term">Water Volume</span> The calculated volume of hot water generated annually for the current **Hot Water Zone**.

## HWG Capacity
* <span class="term">Total Capacity</span> The calculated heating capacity for all equipment specified in the active hot water zone.
* <span class="term">Total Sizing</span> The percentage of peak load that the specified equipment will be capable of covering for the active hot water zone.
    * A value less than 100% indicates that the equipment is undersized relative to the peak load.
* <span class="term">Efficiency</span> The calculated heating COP for all equipment specified in the active hot water zone.
* <span class="term">Demand</span> The calculated electrical demand for all equipment specified in the active hot water zone.

## Zone Group Design Day

View the aggregate loads for the active **Zone Group**.

* <span class="term">HEATING LOAD BY TIME BLOCK</span> The calculated heating loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* <span class="term">COOLING LOAD BY TIME BLOCK</span> The calculated cooling loads (by time block) for all active space conditioning and hot water zones in the **Zone Group**.
* <span class="term">Full Load Run Hours</span> The weighted average value for FLRHs, which considers all active space conditioning and hot water zones in the **Zone Group**.

## Zone Group Equipment

* <span class="term">Total Capacity</span> The calculated heating/cooling capacity for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* <span class="term">Sensible Capacity</span> The calculated sensible cooling capacity for all equipment specified in the active space conditioning zones in the **Zone Group** (does not apply to heating).
* <span class="term">Total Sizing</span> The percentage of peak load that the specified equipment will be capable of covering for the active space conditioning and hot water zones in the **Zone Group**.
    * A value less than 100% indicates that the equipment is undersized relative to the peak load.
* <span class="term">Efficiency</span> The calculated cooling EER/heating COP for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* <span class="term">Demand</span> The calculated electrical demand for all equipment specified in the active space conditioning and hot water zones in the **Zone Group**.
* <span class="term">Connected Flow</span> The combined flow rate of the specified equipment in the **Zone Group**. This is only displayed for **Connected** flow analysis mode.
* <span class="term">Part Load Factor</span> The ratio of peak block load to the installed equipment capacity in the **Zone Group** . Part load factor (PLF) is used to determine the system design flow rate for **Connected** flow analysis mode.
* <span class="term">Design Flow</span> The calculated **Zone Group** flow that the active GHEX must accomodate, either based on peak block load (**Peak Block (Primary-Secondary)** or **Peak Block (Unitary)**) or based on connected flow multiplied by the part load factor (**Connected**).