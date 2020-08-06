import { Component, HostListener } from '@angular/core';

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
	parentNode: any = {};
	origTree = {};
	showJSON = 'none';
	isSelected = false;
	tree: any = [
		{
			name: 'root',
			nodes: [
				{
					name: 'a',
					nodes: [
						{
							name: 'b',
							nodes: [
								{ name: 'c', nodes: [] },
								{ name: 'd', nodes: [{ name: 'f', nodes: [] }] },
							],
						},
						{ name: 'e', nodes: [] },
					],
				},
			],
		},
	]; // initializing mindmap

	/** function to show the mindmap of selected node */

	mindmap(node) {
		this.isDoubleClick = false;
		setTimeout(() => {
			if (!this.isDoubleClick && node.name !== 'root') {
				this.parentNode = {};
				this.getParent(this.tree[0], node.name);
				if (this.isDragged) this.isDragged = !this.isDragged;
				else if (this.isSelected == false) {
					this.origTree = JSON.parse(JSON.stringify(this.tree)); // to make sure variable is not referenced
					node.nodes.forEach((element) => (element.nodes = []));
					this.parentNode.nodes = Array(node);
					this.tree = Array(this.parentNode);
					this.isSelected = true;
				}
			} else {
				this.showJSON = this.showJSON == 'none' ? 'flex' : 'none';
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
		const element = document.getElementById(data.name);
		element.style.transform = 'rotate3d(2, -1, -1, 10turn)';
		setTimeout(() => (element.style.transform = ''), 500);
		setTimeout(() => (data.nodes = []), 500);
		return false;
	}

	/** stores the parent node of the specified node in parentNode */

	getParent(obj, name) {
		if (obj.name == name && name !== 'root') {
			return true;
		}
		if (name == 'root') {
			this.parentNode = this.tree[0];
			return;
		}
		for (let node of obj.nodes) {
			if (this.getParent(node, name)) {
				this.parentNode = obj;
				break;
			}
		}
	}

	/** function to close the mindmap of particular node */

	@HostListener('document:keydown.escape', ['event']) escapePressed(e: Event) {
		this.isSelected = false;
		this.tree = this.origTree;
	}
}
