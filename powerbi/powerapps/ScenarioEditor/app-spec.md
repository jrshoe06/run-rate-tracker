# Canvas app specification (ScenarioEditor)

## Purpose

CRUD for `RunRateScenarios` SharePoint list directly from report context.

## Screens

- `BrowseScenarios`
- `EditScenario`
- `ConfirmDelete`

## Controls and formulas

### BrowseScenarios

- Gallery `galScenarios` (`Items = SortByColumns(RunRateScenarios, "scenarioName")`)
- Button `btnNew` (`OnSelect = NewForm(frmScenario); Navigate(EditScenario)`)
- Icon `icoEdit` (`OnSelect = EditForm(frmScenario); Navigate(EditScenario)`)
- Icon `icoDelete` (`OnSelect = Set(varScenarioToDelete, ThisItem); Navigate(ConfirmDelete)`)

### EditScenario

- Form `frmScenario` bound to `RunRateScenarios`
- Save button:

```powerfx
SubmitForm(frmScenario);
If(frmScenario.Error = Blank(), Back())
```

- Cancel button: `ResetForm(frmScenario); Back()`

### ConfirmDelete

- Delete button:

```powerfx
Remove(RunRateScenarios, varScenarioToDelete);
Back();
Back()
```

## Direct Patch() equivalent

```powerfx
Patch(
    RunRateScenarios,
    Defaults(RunRateScenarios),
    {
        scenarioId: GUID(),
        scenarioName: txtScenarioName.Text,
        clientName: txtClientName.Text,
        caseType: ddCaseType.Selected.Value,
        projectedVolume: Value(txtVolume.Text),
        projectedStartMonth: txtStartMonth.Text,
        targetCompletionMonth: txtEndMonth.Text,
        notes: txtNotes.Text
    }
)
```
