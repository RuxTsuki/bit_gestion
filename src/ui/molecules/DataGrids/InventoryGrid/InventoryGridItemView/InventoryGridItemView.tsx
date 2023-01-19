import { MeterItemResponse } from "@/models";

import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import { InputWithIcon } from "@/ui/Atoms/Inputs";
import './inventory_grid_item_view.css';

type Props = {
    item: MeterItemResponse;
}

export const InventoryGridItemView = ({ item }: Props) => {
    return (
        <div className="inventory-item-contianer">
            <div className="item-description-container">
                <div className="item-header">
                    <h2>Acerca Del Producto</h2>
                </div>

                <div className="item-specification">
                    <div className="item-data">
                        <div className="first-section">
                            <InputWithIcon
                                onChange={() => { }}
                                type="number"
                                value={item.serial}
                                Icon={<MoreOutlinedIcon />}
                            />
                        </div>
                        <div className="second-section">

                        </div>
                    </div>
                    <div className="item-stock">

                    </div>
                </div>
            </div>
        </div>
    )
}