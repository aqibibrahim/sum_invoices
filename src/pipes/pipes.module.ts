import { NgModule } from '@angular/core';
import { SortbynamePipe } from './sortbyname/sortbyname';
import { ShortNumberPipe } from './short-number/short-number';
@NgModule({
	declarations: [SortbynamePipe,

    ShortNumberPipe],
	imports: [],
	exports: [SortbynamePipe,

    ShortNumberPipe]
})
export class PipesModule {}
