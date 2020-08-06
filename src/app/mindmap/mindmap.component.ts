import { Component } from '@angular/core';

@Component({
	selector: 'mindmap',
	templateUrl: './mindmap.component.html',
	styleUrls: ['./mindmap.component.css'],
})
export class MindmapComponent {
	constructor() {}
	isDragged = false;
	isDoubleClick = false;
	newNode = '';
	parentNode = {};

	tree = [
		{
			name: 'root',
			nodes: [
				{ name: 'k', nodes: [] },
				{ name: 'l', nodes: [{ name: 'm', nodes: [] }] },
			],
		},
	]; // initializing mindmap

	/** function to show the mindmap of selected node */

	mindmap(node) {
		this.isDoubleClick = false;
		setTimeout(() => {
			if (!this.isDoubleClick) {
				this.isDragged ? (this.isDragged = !this.isDragged) : console.log(node);
			}
		}, 300);
	}

	/** function to create new node with name specified by user */

	addNode(data) {
		this.isDoubleClick = true; // avoid single click event
		this.newNode = prompt('Enter node value:'); // get name of the node from user
		this.parentNode = {};
		this.getParent(this.tree[0], this.newNode); // check if new node exists
		Object.keys(this.parentNode).length === 0
			? this.newNode
				? data.nodes.push({ name: this.newNode, nodes: [] })
				: null
			: alert('Duplicate nodes not allowed');
	}

	/** function to delete all the children nodes */
	deleteNode(data) {
		data.nodes = [];
		return false;
	}

	/** stores the parent node of the specified node in parentNode */
	getParent(obj, name) {
		if (obj.name == name) {
			console.log('TRUE');
			return true;
		}
		for (let node of obj.nodes) {
			if (this.getParent(node, name)) {
				this.parentNode = obj;
				break;
			}
		}
	}
}
