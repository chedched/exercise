import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { LangDetectionService } from '../../services/lang-detection.service';
import { File } from '../../classes/file';

@Component({
	selector: 'app-exercise',
	templateUrl: './exercise.component.html',
	styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit {

	constructor(
		private files: FilesService,
		private langDetect: LangDetectionService
	) { }

	ngOnInit() {
		/*
		this.files.getAll().then(function(res) {
			console.log(res);
		})
		.catch(function(error) {
			// Hand over error to notification service here
		});
		*/

		this.filePaths = this.files.getAll();		
	}

	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	// File tree
	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	
	// Class if it was more complex
	filePaths: Array<String>;
	sortingOrder = 'asc';

	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	// Code editor
	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

	code: String = 'Please choose a file from the tree.';
	editorOptions = {theme: 'vs-dark', language: 'plain', readOnly: true, automaticLayout: true};
	coverage: Array<Object>;
	//editor: any;
	onFileClicked(path) {
		let file = this.files.get(path);
		
		// Exercise comment:
		// Lang detect Should be restricted (langs that code editor supports)
		
		// Angular @Input setter detects only object updates, 
		// so property updates are not handled =
		// we need to update whole object when language changes
		this.editorOptions = {theme: 'vs-dark', language: this.langDetect.getLanguage(path), readOnly: true, automaticLayout: true};
		this.code = file.data;
		this.coverage = file.Coverages;
	}

	buildEditorRanges(ranges) {
		let editorRanges = [];
		let options = {inlineClassName: 'code-highlight'};
		ranges.forEach(function(range) {
			editorRanges.push({
				range: new monaco.Range(range.startLine, range.startColumn, range.endLine, range.endColumn), options: options
			});
		});
		return editorRanges;
	}

	onInit(event) {
		if(this.coverage) {
			let ranges = this.buildEditorRanges(this.coverage);
			event.deltaDecorations([], ranges);
		}
	}
}
