import { NgModule } from "@angular/core";
import { 
    TuiTextfieldControllerModule, 
    TuiButtonModule, 
    TuiDropdownModule, 
    TuiLinkModule, 
    TuiExpandModule, 
    TuiPrimitiveCheckboxModule,
    TuiErrorModule
} from "@taiga-ui/core";
import {TuiInputModule, TuiIslandModule} from '@taiga-ui/kit';
import {TuiActiveZoneModule, TuiAutoFocusModule} from '@taiga-ui/cdk';
import {
    TuiAlignContentModule,
    TuiCodeModule,
    TuiColorEditModule,
    TuiColorPickerModule,
    TuiColorSelectorModule,
    TuiDetailsModule,
    TuiEditLinkModule,
    TuiEditorImagePreviewModule,
    TuiEditorModule,
    TuiEditorSocketModule,
    TuiFlatPickerModule,
    TuiFontSizeModule,
    TuiFontStyleModule,
    TuiHighlightColorModule,
    TuiImageEditorModule,
    TuiInputColorModule,
    TuiLinearMultiPickerModule,
    TuiLinearPickerModule,
    TuiListConfigsModule,
    TuiPaletteModule,
    TuiTableCellColorModule,
    TuiTableCreateModule,
    TuiTableMergeCellsModule,
    TuiTableRowColumnManagerModule,
    TuiTableSizeSelectorModule,
    TuiTextColorModule,
    TuiTiptapEditorModule,
    TuiToolbarModule
} from '@taiga-ui/addon-editor';

@NgModule({
    exports: [
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
    TuiDropdownModule,
    TuiActiveZoneModule,
    TuiLinkModule,
    TuiExpandModule,
    TuiIslandModule,
    TuiPrimitiveCheckboxModule,  
    TuiCodeModule,
    TuiColorEditModule,
    TuiColorPickerModule,
    TuiColorSelectorModule,
    TuiDetailsModule,
    TuiEditLinkModule,
    TuiEditorImagePreviewModule,
    TuiEditorModule,
    TuiEditorSocketModule,
    TuiFlatPickerModule,
    TuiFontSizeModule,
    TuiFontStyleModule,
    TuiHighlightColorModule,
    TuiImageEditorModule,
    TuiInputColorModule,
    TuiLinearMultiPickerModule,
    TuiLinearPickerModule,
    TuiListConfigsModule,
    TuiPaletteModule,
    TuiTableCellColorModule,
    TuiTableCreateModule,
    TuiTableMergeCellsModule,
    TuiTableRowColumnManagerModule,
    TuiTableSizeSelectorModule,
    TuiTextColorModule,
    TuiTiptapEditorModule,
    TuiAlignContentModule,
    TuiToolbarModule,
    TuiAutoFocusModule,
    TuiErrorModule
]})
export class TaigaModule{}