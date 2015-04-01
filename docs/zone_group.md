# Zone Group

Use this page to create a new zone group within the project. An unlimited number of zone groups are allowed.

In **LoopLink PRO**, a Zone Group can only be served by one active GHEX. Here are a few examples for project setup/types that can be easily modeled in **LoopLink PRO**:

* A single (block) zone served by a small GHEX.
    * An example would be a small office with a central heat pump. 
* A large, multi-zone building served by a single GHEX.
    * The zones could be served by distributed heat pumps or a central plant.
* Multiple buildings tied to a central GHEX
    * An example would be a housing development or college campus served by one central field). Each building would be modeled as a "Zone" inside of the active Zone Group.

## Zone Group Name


* <span class="term">Name</span> Name the zone group currently being designed. An unlimited number of zone groups are allowed.

## Zone Group Flow

* <span class="term">Flow Analysis Mode</span> Select the desired mode to calculate the system flow requirements.
    * <span class="term">Peak Block (Primary-Secondary)</span> Select this mode if the interior building loop will be decoupled from the exterior GHEX piping (i.e. - inside flow rate can differ from the outside flow rate).
        * In load-sharing applications (i.e. simultaneous hot water generation and space cooling load), the GHEX will benefit from both reduced load and flow requirements due to the fact that the inside and outside flow rates can differ.
        * **LoopLink PRO** will calculate system flow based on the peak load requirements for the GHEX (after accounting for peak load reduction in load sharing applications) according to the desired **Block Flow Per Ton**
    * <span class="term">Peak Block (Unitary)</span> Select this mode if the interior building loop is directly coupled to the exterior GHEX piping where the inside and outside flow rates have to be the same.
        * In load-sharing applications (i.e. simultaneous hot water generation and space cooling load), the GHEX will benefit from reduced load requirements but must be able to accommodate the higher flow rate required by concurrent equipment operation (separate equipment serving the simultaneous heating and cooling loads) due to the unitary piping/control arrangement.
        * **LoopLink PRO** will calculate system flow based on the peak load requirements for the GHEX (in addition to any loads that operate concurrently in load sharing applications which will increase system flow requirements) according to the desired **Block Flow Per Ton**
    * <span class="term">Connected</span> Select this mode to directly specify the system flow rate (which is done on the Zone page). 
* <span class="term">Block Flow Per Ton</span> The Zone Group flow rate that the GHEX must accommodate. 
    * Optimal flow rates for closed loop systems are in the 2.5-3.0 gpm per ton range.
    * In some cases, 2 gpm per ton is acceptable but 3+ gpm per ton almost always results in excessive pump power.
    * This input will only appear when either **Peak Block (Primary-Secondary)** or **Peak Block (Unitary)** is the selected flow analysis mode for the Zone Group. 

## Entering Water Temperatures

The design EWT will depend on location, type of GHEX and the trade-off between performance and GHEX size (first cost). Design EWT values will drastically affect GHEX design lengths.

* <span class="term">EWT Min</span> The minimum entering water temperature the closed-loop ground connection will be designed to provide under peak heating conditions.
    * As a starting point for design, the minimum EWT should be 15-20&deg;F (8.3-11.1&deg;C) below the deep earth temperature at the project location or 25&deg;F (-3.8&deg;C), whichever is greater.
    * It is not uncommon to start with a 30&deg;F (-1.1&deg;C) minimum EWT and adjust up or down, depending on location and the heating requirements of the system. 
* <span class="term">EWT Max</span> The maximum entering water temperature the closed-loop ground connection will be designed to provide under peak cooling conditions.
    * As a starting point for design, the maximum EWT should be 30-40&deg;F (16.7-22.2&deg;C) above the deep earth temperature at the project location or 95&deg;F (35&deg;C), whichever is less.
    * It is not uncommon to start with a 90&deg;F (32.2&deg;C) maximum EWT and adjust up or down, depending on location and the cooling requirements of the system. 

<div class="resource">
	<h3>Additional Resource</h3>
	<p>For more information on guidelines to follow when selecting minimum entering water temperature see Section 2.7 (Chapter 2, page 70-73) in IGSHPA's <a href="http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html" target="_blank">Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide</a></p>
</div>

