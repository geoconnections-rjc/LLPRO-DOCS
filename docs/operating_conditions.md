# Detailed GSHP Selection Mode

Use this page specify the GSHP models to use for the project. Apply a specific set of operating conditions to each GSHP for accurate performance modeling. 

## Operating Conditions





## Equipment Selection

*For detailed discussion on factors that affect heat pump performance, refer to Section 2.3.3 (Chapter 2, pages 16-18) in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore")*

###Detailed Equipment Entry
With this method, the simple heat pump entry fields are hidden. An unlimited number of different make/models of GSHP units are allowed in a single zone.

* Specify whether a **Water-Air** or **Water-Water** unit will be added to the zone. Note that chillers are found in the **Water-Water** category.
    * Use the provided filters to find the appropriate model.
    * Once a model has been selected, specify the quantity to add to the zone.
    * Use the provided sliders to adjust GSHP performance based on the desired operating conditions - source flow (gpm), entering load air/water temperatures, and load flow (cfm or gpm).
    * Save the selection to apply it to the zone.
    * Once a model has been added to the zone, you may add another or move on to the next task in the project.

# Object Summary

The Object Summary is displayed to the left of the main page.

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
