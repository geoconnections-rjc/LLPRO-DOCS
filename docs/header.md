# STEP-DOWN STEP-UP REVERSE-RETURN (SDSU-RR) HEADER

Use this page to size the header piping and perform head loss calculations for the active GHEX.

## HEADER DESIGN PARAMETERS

* **Include Vaults** - Select this box if a buried valve vault will be used as part the GHEX layout. When selected, **LLPRO** will include the pressure drop for supply-return pipe run from the mechanical room to the vault in addition to the circuit pipe runs from the vault to the loopfield. In general, underground valve vaults are used in large commercial systems because:
    * Valve vaults help to minimize the number of supply/return piping pairs being run into the building, which is useful on large systems - especially when mechanical room space is limited. 
    * Use of large piping from the mechanical room to the valve vault will also decrease the loopfield head loss, especially when the distance between the mechanical room and loopfield is significant.
* **Number of Vaults** - Specify the number of underground valve vaults to use in the GHEX layout.
    * The options in the dropdown will be limited such that the loopfield will always be broken into even multiples (to ensure a balanced field layout is used).
    * This input will only appear when **Include Vaults** is selected.
* **Number of Circuits** - Specify the number of supply-return piping pairs to use in the GHEX layout
    * The options in the dropdown will be limited such that the loopfield will always be broken into even multiples (to ensure a balanced circuit layout is used).
    * Supply return pipe sizing is typically constructed of 2" or 3" HDPE.
    * The recommended flow range for 2" HDPE (DR-11) is 20-36 gpm.
    * The recommended flow range for 3" HDPE (DR-11) is 55-100 gpm.
    * The recommended flow range for 3" HDPE (DR-15.5) is 60-120 gpm.
    * Refer to Table 4.22 (page 4-27) in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore") for recommended flow ranges for additional pipe sizes.

## SDSU-RR HEAD LOSS TABLE
The table provides the head loss calculations for the specified Step Down-Step Up Reverse-Return (SDSU-RR) header for a representative circuit. All calculations in the table assume HDPE except in the loop when PEX-a is specified on the GHEX page. When specifying distances, it is important to use the furthest distance from the reference location to ensure that the calculated head loss represents the worst case scenario.

* **Autoheader Table** - With this setting, **LLPRO** will automatically size the pipe in the SDSU-RR circuit according to the desired **Minimum Flushing Velocity** and selected allowable pipe sizes. 
    * This is the default pipe sizing method.
    * The flushing flow rate for the circuit is calculated to be the greater of (1) the amount of flow required to flush the large supply-return piping itself or (2) the amount of flow required to simultaneously flush all parallel loops that are tied to the circuit.
    * Pipe size will automatically be reduced if the velocity in the section falls below the desired **Minimum Flow Velocity**
    * Click the **Select Pipes to Use in Header** icon to turn specific pipe sizes on/off.
* **Manual Edit Table** - With this setting, you may manually override the sizing and DR-value for any piping section in the SDSU-RR circuit.
    * In manual entry mode, use caution when selecting pipe size to ensure it can easily be flushed.
    * Refer to Section 8.2 in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore") for discussion on system Flushing & Purging basics.
* **Select Pipes to Use in Header** - Select this icon to activate pipe sizes to use in auto-headering your loopfield. Active elements are shown in blue.
    * Activated pipe sizes won't necessarily be used when auto-headering. **LLPRO** will select pipe sizes to minimize headloss while maintaining minimum flushing flow velocities.
    * The headloss table will update automtically when a change is made.
    * Per paragraph 1C.2.3 in the [IGSHPA Design and Installation Standards Manual](http://www.geoconnectionsinc.com/bookstore/IGSHPA_design_installation_standards.html "Geo-Connections Bookstore"), pipe sizes 2" and smaller must be at minimum DR-11 (based on pressure rating, 160 psi or greater). Pipe sizes 3" and larger must be at minimum DR-17 (based on pressure rating, 100 psi or greater).
    * The minimum pipe size and DR-values in the table will automatically be filtered according to the loop pipe size/dimension ratio selected for use in the GHEX design.
* **Design Flow (Checkbox)** - Use this checkbox to show/hide the head loss calculations based on the system design flow rate.
* **Flushing Flow (Checkbox)** - Use this checkbox to show/hide the head loss calculations based on the system flushing flow rate.
* **Minimum Flushing Velocity** - The desired flushing velocity for the circuit. **LLPRO** will use this value to determine the appropriate place(s) to reduce the pipe size along the header. This value drives the calculations in **Autoheader** mode. 
    * Per Section 8.2 in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore"):
        * A minimum purging flow rate of 2 feet per second (FPS) throughout a piping system is required to completely remove trapped air.  This velocity must be maintained in each branch during air purging.
        * Refer to Section 4.6, Tables 4.25-4.28 in for flushing flow rates necessary to achieve 2 FPS for various pipe types/sizes.


*For more information on proper header pipe sizing and layout, refer to Section 5.1.3 (Chapter 5, pages 5-21) in IGSHPA's [Ground Source Heat Pump Residential & Light Commercial Design and Installation Guide](http://www.geoconnectionsinc.com/bookstore/IGSHPA_rlc_manual.html "Geo-Connections Bookstore").*

##CUSTOMER SUPPORT
---
Thank you for using LoopLink PRO. For technical support and other inquiries, contact us via [eMail](mailto:looplink@geoconnectionsinc.com "LoopLink PRO Support") or give us a call at (866) 995-4449. Our customer service and software support teams are available 8:00am - 5:00pm (CST) Monday through Friday.