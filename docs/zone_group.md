# Zone Group

Use this page to create a new zone group within the project. An unlimited number of zone groups are allowed.

* <span class="term">The Zone Group Construct</span>
A Zone Group can be a building comprised of hundreds of zones or a campus of hundreds of buildings. You can add any number of Zone Groups to a project and each one acts like a project within a project. Each Zone Group can contain any number of Zones or Domestic Hot Water elements and each of those elements can contain any number of heat pumps all with their own independently adjustable operating conditions. The zone group ties them all to a single active loopfield but allows you to model any number of possible loop designs.

* Here are a few examples for project setup/types that can be easily modeled as a Zone Group in **LoopLink PRO**:
    * A single (block) zone served by a small GHEX.
        * An example would be a small office with a central heat pump. 
    * A large, multi-zone building served by a single GHEX.
        * The zones could be served by distributed heat pumps or a central plant.
    * Multiple buildings tied to a central GHEX
        * An example would be a housing development or college campus served by one central field). Each building would be modeled as a "Zone" inside of the active Zone Group.

## Zone Group Name

* <span class="term">Name</span> Name the zone group currently being designed. Since an unlimited number of zone groups are allowed, the name should be unique to avoid confusion. 

## Zone Group Flow
LoopLink PRO natively accounts for the film resistance of a given fluid type, temperature and concentration at the design system flowrate in the ground-loop design calculations. Because of this, you must specify how design flowrate is to be determined. 

* <span class="term">Flow Analysis Mode</span> Select the desired mode to determine the design flow. Depending on the selection, **LoopLink PRO** will calculate flow either based on peak block load or specified equipment flow.
    * <span class="term">Peak Block (Primary-Secondary)</span> Select this mode to calculate design flow based on the peak loads where the interior piping flow is decoupled from the exterior GHEX piping  flow (i.e. - the inside flow rate can differ from the outside flow rate).
        * With this analysis mode, **LoopLink PRO** will account for peak load reduction due to load sharing and calculate flow according to the desired **Block Flow Per Ton**.
        * An example of a load-sharing application would be simultaneous hot water generation and space cooling load.  In this example, the GHEX will benefit from both reduced load and flow due to the fact that the inside and outside flow rates can differ.
    * <span class="term">Peak Block (Unitary)</span> Select this mode to calculate design flow based on the peak loads where the interior building flow is directly coupled to the exterior GHEX piping (i.e. - the inside and outside flow rates must match one another).
        * With this analysis mode, **LoopLink PRO** will calculate design flow based on the peak loads according to the desired **Block Flow Per Ton**. It will not account for peak reduction due to load sharing in the zone group.
        * An example of loads that operate concurrently to increase design flow requirements would be simultaneous space cooling and hot water generation. In this example, the GHEX will benefit from reduced load but not reduced flow requirements due to the fact that the inside and outside flow rates cannot differ.
    * <span class="term">Connected</span> Select this mode to determine the design flow based on equipment requirements in the zone group. 
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

## Import Zones
You can import a zone file from GCHPCalc or GLD directly into your zone group. Depending on the file type and number of zones, you may be prompted to supply more information.

* <span class="icon_def">![Import Zones](/img/import_zone.png "Import Zone")</span> Click the icon to select a file for import.
    * <span class="term">Importing .zon files from GCHPCalc or GSHPCalc</span> When you submit a .zon file from GCHPCalc or GSHPCalc, a window will appear prompting you to enter more information.
        * Zone Name, Connected Flow (when applicable), Cooling Cap (Kbtu/hr), Sensible Capacity Ratio, EER, Heating Cap (kBtu/hr), and COP are necessary to create a valid zone within the project.
        * By default, the installed capacity values will be such that they match the loads for the given zone. Overwrite these values as necessary.
        * For .zon files that contain information for multiple zones in a given project, the EER and COP values that are applied to the first zone in the list will be applied to all remaining zones in the file. Overwrite these values as necessary.
    * <span class="term">Importing .zon files from GLD</span> When you submit a .zon file from GLD, all of the necessary information to create a valid zone is in the file. No further information is required for zone creation. Overwrite the values saved in the individual zone(s) as necessary.
