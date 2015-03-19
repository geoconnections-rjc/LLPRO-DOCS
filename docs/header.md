# Step-Down Step-Up Reverse Return (SDSU-RR) Header

Use this page to size the header piping and perform head loss calculations for the active GHEX.

## Tab Navigation
At the top of the GHEX page are two tabs allowing you to navigate between the GHEX design parameters (default page) and the GHEX header.

* <span class="icon_def">![GHEX Details](img/ghex.png "GHEX Details")</span> View/Edit GHEX design parameters
* <span class="icon_def">![Header GHEX](img/header_ghex.png "Header GHEX")</span> View/Edit header.

## Header Design Parameters

* <span class="term">Include Vaults</span> Select this box if a buried valve vault will be used as part the GHEX layout. When selected, **LoopLink PRO** will include the pressure drop for supply-return pipe run from the mechanical room to the vault in addition to the circuit pipe runs from the vault to the loopfield. In general, underground valve vaults are used in large commercial systems because:
    * Valve vaults help to minimize the number of supply/return piping pairs being run into the building, which is useful on large systems - especially when mechanical room space is limited. 
    * Use of large piping from the mechanical room to the valve vault will also decrease the loopfield head loss, especially when the distance between the mechanical room and loopfield is significant.
* <span class="term">Number of Vaults</span> Specify the number of underground valve vaults to use in the GHEX layout.
    * The options in the dropdown will be limited such that the loopfield will always be broken into even multiples (to ensure a balanced field layout is used).
    * This input will only appear when **Include Vaults** is selected.
* <span class="term">Number of Circuits</span> Specify the number of supply-return piping pairs to use in the GHEX layout
    * The options in the dropdown will be limited such that the loopfield will always be broken into even multiples (to ensure a balanced circuit layout is used).
    * Supply return pipe sizing is typically constructed of 2" or 3" HDPE.
    *	| DR  | Nominal Size  | Recommended Flow Range  |
		| :-: | :-----------: | :---------------------: |
		| 11  | 2&quot;       |  20 - 36 gpm            |
		| 11  | 3&quot;       |  55 - 100 gpm           |
		| 15  | 3&quot;       |  60 - 120 gpm           |

	
<div class="resource">
	<h3>Additional Resource</h3>
	<p>Refer to Table 4.22 (page 4-27) in IGSHPA's  <a href="http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html">Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide</a>
for recommended flow ranges for additional pipe sizes.</p>
</div> 

## SDSU-RR Head Loss Table
The table provides the head loss calculations for the specified Step Down-Step Up Reverse-Return (SDSU-RR) header for a representative circuit. All calculations in the table assume HDPE except in the loop when PEX-a is specified on the GHEX page. When specifying distances, it is important to use the furthest distance from the reference location to ensure that the calculated head loss represents the worst case scenario.

### Headering Methods
The active method will be signified by a blue bar underneath the corresponding icon.

* <span class='term'>Auto-Header Table<span class="icon_def">![Auto-Header Table](img/auto_header.png "Auto-Header Table")</span></span>With this setting, **LoopLink PRO** will automatically size the pipe in the SDSU-RR circuit according to the desired **Minimum Flushing Velocity** and selected allowable pipe sizes. 
    * This is the default pipe sizing method.
    * The flushing flow rate for the circuit is calculated to be the greater of (1) the amount of flow required to flush the large supply-return piping itself or (2) the amount of flow required to simultaneously flush all parallel loops that are tied to the circuit.
    * Pipe size will automatically be reduced if the velocity in the section falls below the desired **Minimum Flow Velocity**
    * Click the **Select Pipes to Use in Header** icon to turn specific pipe sizes on/off.
* <span class="term">Manually Edit Table <span class="icon_def">![Manually Edit Table](img/manually_edit_button.png "Manually Edit Table")</span></span> With this setting, you may manually override the sizing and DR-value for any piping section in the SDSU-RR circuit.
    * In manual entry mode, use caution when selecting pipe size to ensure it can easily be flushed.

<div class="resource">
	<h3>Additional Resource</h3>
	<p>Refer to Section 8.2 in IGSHPA's   <a href="http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html">Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide</a> for discussion on system Flushing & Purging basics.</p>
</div>

### Headering Options
* <span class="term">Select Pipes to Use in Header <span class="icon_def">![Select Pipes](img/pipe.png "Select Pipes")</span></span> Select this icon to activate pipe sizes to use in auto-headering your loopfield. Active elements are shown in blue.
    * Activated pipe sizes won't necessarily be used when auto-headering. **LoopLink PRO** will select pipe sizes to minimize headloss while maintaining minimum flushing flow velocities.
    * The headloss table will update automtically when a change is made.
    * Per paragraph 1C.2.3 in the [IGSHPA Design and Installation Standards Manual](http://www.geoconnectionsinc.com/bookstore/IGSHPA_design_installation_standards.html "Geo-Connections Bookstore"), pipe sizes 2" and smaller must be at minimum DR-11 (based on pressure rating, 160 psi or greater). Pipe sizes 3" and larger must be at minimum DR-17 (based on pressure rating, 100 psi or greater).
    * The minimum pipe size and DR-values in the table will automatically be filtered according to the loop pipe size/dimension ratio selected for use in the GHEX design.
* <span class="term">Design Flow (Checkbox)</span> Use this checkbox to show/hide the head loss calculations based on the system design flow rate.
* <span class="term">Flushing Flow (Checkbox)</span> Use this checkbox to show/hide the head loss calculations based on the system flushing flow rate.
* <span class="term">Minimum Flushing Velocity</span> The desired flushing velocity for the circuit. **LoopLink PRO** will use this value to determine the appropriate place(s) to reduce the pipe size along the header. This value drives the calculations in **Autoheader** mode. 
    * Per Section 8.2 in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore"):
        * A minimum purging flow rate of 2 feet per second (FPS) throughout a piping system is required to completely remove trapped air.  This velocity must be maintained in each branch during air purging.
        * Refer to Section 4.6, Tables 4.25-4.28 in for flushing flow rates necessary to achieve 2 FPS for various pipe types/sizes.


<div class="resource">
	<h3>Additional Resource</h3>
	<p>For more information on proper header pipe sizing and layout, refer to Section 5.1.3 (Chapter 5, pages 5-21) in IGSHPA's   <a href="http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html">Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide</a>.</p>
</div>
