import dropdown from "../css/dropdown.module.css";

export function DropdownButton(props) {
	return (
		<a to={props.href} onClick={props.onClick} className={dropdown.menu_item + " " + dropdown.menu_button}>
			<span className={dropdown.icon_button}>{props.leftIcon}</span>
			{props.children}
		</a>
	);
}

export function DropdownItem(props) {
	return (
		<div className={dropdown.menu_item}>
			<span className={dropdown.icon_button}>{props.leftIcon}</span>
			{props.children}
		</div>
	);
}