import styles from "./BtnSelecao.module.css";

function BtnSelecao({ options = [], value, onChange, className = "", grid = 2 }) {

    const gridOption = grid === 2
        ? styles.container
        : styles.containerGrid;

    return (
        <div className={`${gridOption} ${className}`}>
            {options.map((option) => {
                const isActive = value === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={`${styles.button} ${isActive ? styles.active : ""}`}
                    >
                        <span className={styles.dot}></span>
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}

export default BtnSelecao;