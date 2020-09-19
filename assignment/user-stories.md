Hello development team!

We've talked with Gerald and identified the user stories required to complete his software needs. They are attached!

Thanks,

Rosa,

Product Manager

<br/>
<br/>

## Geralds Contracting Application (Assignment 3)

### As Gerald, I need to enter inches into the required measurements on the command line.

The current application assumes `--width 8` and `--length 8` are feet, but Gerald would like to be able to set the units. In discussion, we came up with severald ideas that would accomplish the goal:

  1. Allowing `--width 8ft 3in` as an entry
  2. Allowing `--width 8'3"` as an entry
  3. Adding a flag to determine the units (i.e. `--width 99 --units inches`)

Only one method is required, but decimal values are NOT acceptable. (Gerald doesn't want `8.3` to be confused with `8'3"`).

### As Gerald, I need to be able to recall prior house builds without knowing their dimensions

The current application requires that I put in a width and length to make a calculation. Gerald would like to be able to assign set of parameters to a customer by name, and then recall the results by that same name.

### As Gerald, I need the application to seperate between studs and plates.

Currently, we return the total number of studs required for the building. Gerald need to know the different between the top/bottom boards (called "plates") and the vertical boards (called "studs"). We also need to calculate two rows of top plates. The bottom plates will still only have one row.

### As Gerald, I need "POSTs" to be called "posts".

We call the extra 4x4's "POSTs", and they need to be called "posts".