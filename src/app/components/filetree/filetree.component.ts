import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

import { Treenode } from '../../classes/treenode';

@Component({
	selector: 'filetree',
	templateUrl: './filetree.component.html',
	styleUrls: ['./filetree.component.scss']
})

export class FiletreeComponent implements OnInit {

	@Input() paths;
	@Input() sort;
	@Output() fileClicked = new EventEmitter();

	pathTree: Array<Treenode>;
	options: Object = {};
	
	constructor() { }

	ngOnInit() {
		this.pathTree = this.getPathTree(this.paths);
		this.sortTree(this.pathTree, this.sort);
	}

	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	// Tree
	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

	// Iterates over a given path and builds a node = branch of tree
	pathToNode(path, sourceNode) {
		let pathNames = path.split('/');
		return pathNames.reduce(function(node, name) {
			node.children = node.children || [];
			let tempNode = node.children.find(n => n.name === name);
			if(!tempNode) {
				tempNode = {name: name};
				node.children.push(tempNode);
			}
			return tempNode;
		}, sourceNode);
	}

	// Iterate over all paths and builds tree
	getPathTree(paths) {
		let that = this;
		let nodes = [];
		let sourceNode = {children: nodes}
		paths.reduce(function(node, path) {
			that.pathToNode(path, sourceNode);
			return node;
		}, sourceNode);
		return nodes;
	}

	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	// Sorting
	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

	// Exercise comment:
	// Guess it's needed in various components of app
	// so I'd set it up in a more generic way in a service that can be injected
	// IE: Sort by key, check if integer/float etc
	sortByName(Array, sortingOrder) {
		return Array.sort(function(a, b) {
			a = a.name.toLowerCase(); 
			b = b.name.toLowerCase();
			let decider;
			if(a < b) {
				decider = -1;
			}
			else {
				decider = 1;
			}
			if (sortingOrder == 'desc') {
				decider = decider * -1;
			}
			return decider;
		});
	}

	sortTree(tree, sortingOrder) {
		const that = this;
		that.sortByName(tree, sortingOrder);
		tree.forEach(function(branch) {
			if(branch.children) {
				that.sortTree(branch.children, sortingOrder);
			}
		});
	}

	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
	// Emitters
	/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXX */

	getParent(node) {
		if(node.parent == null || !node.parent.data.name) {
			return false;
		}
		else {
			return node.parent;
		}
	}

	buildPath(node) {
		const that = this;
		let path = node.data.name;
		while(true) {
			let parentNode = that.getParent(node);
			if(!parentNode) {
				break;
			}
			else {
				path = parentNode.data.name + '/' + path;
				node = parentNode;
				that.getParent(node);
			}
		}
		return path;
	}

	onActivation(event) {
		if(!event.node.children) {
			this.fileClicked.emit(this.buildPath(event.node));
		}
	}
}
