import { Component, OnInit } from '@angular/core';

const defaultMediaObject = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<img src="..." class="wd-100p wd-sm-200 mb-3 mb-sm-0 mr-3" alt="...">
	<div class="media-body">
		<h5 class="mt-0">Media heading</h5>
		<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
	</div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

const mediaObjectNesting = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<img src="..." class="wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="...">
	<div class="media-body">
		<h5 class="mt-0">Media heading</h5>
		Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

		<div class="media d-block d-sm-flex mt-3">
			<a class="mr-3" href="" (click)="false">
				<img src="..." class="wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="...">
			</a>
			<div class="media-body">
				<h5 class="mt-0">Media heading</h5>
				Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
			</div>
		</div>
	</div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

const mediaObjectAlignment = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<img src="..." class="wd-100p mb-3 mb-sm-0 align-self-start mr-3 wd-sm-150" alt="...">
	<div class="media-body">
		<h5 class="mt-0">Top-aligned media</h5>
		<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
		<p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
	</div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

const mediaObjectCenterAlign = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<img src="..." class="align-self-center wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="...">
	<div class="media-body">
		...
	</div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

const mediaObjectBottomAlign = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<img src="..." class="align-self-end wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="...">
	<div class="media-body">
		...
	</div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

const mediaObjectOrder = {
  htmlCode: 
`<div class="media d-block d-sm-flex">
	<div class="media-body">
		<h5 class="mt-0 mb-1">Media object</h5>
		Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
	</div>
	<img src="..." class="wd-100p wd-sm-150 mb-3 mb-sm-0 ml-3" alt="...">
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}



const mediaObjectList = {
  htmlCode: 
`<ul class="list-unstyled">
	<li class="media d-block d-sm-flex">
		<img src="..." class="wd-100p wd-sm-150 mb-3 mb-sm-0 mr-3" alt="...">
		<div class="media-body">
			<h5 class="mt-0 mb-1">List-based media object</h5>
			Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
		</div>
	</li>
	<li class="media d-block d-sm-flex my-4">
		...
	</li>
	<li class="media d-block d-sm-flex">
		...
	</li>
</ul>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent {}`
}

@Component({
  selector: 'app-media-object',
  templateUrl: './media-object.component.html'
})
export class MediaObjectComponent implements OnInit {

  defaultMediaObjectCode: any;
  mediaObjectNestingCode: any;
  mediaObjectAlignmentCode: any;
  mediaObjectCenterAlignCode: any;
  mediaObjectBottomAlignCode: any;
  mediaObjectOrderCode: any;
  mediaObjectListCode: any;

  constructor() { }

  ngOnInit(): void {
    this.defaultMediaObjectCode = defaultMediaObject;
    this.mediaObjectNestingCode = mediaObjectNesting;
    this.mediaObjectAlignmentCode = mediaObjectAlignment;
    this.mediaObjectCenterAlignCode = mediaObjectCenterAlign;
    this.mediaObjectBottomAlignCode = mediaObjectBottomAlign;
    this.mediaObjectOrderCode = mediaObjectOrder;
    this.mediaObjectListCode = mediaObjectList;
  }

  scrollTo(element: any) {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
