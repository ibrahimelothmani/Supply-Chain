package ibrahim.backend.mapper;

import ibrahim.backend.dto.InventoryResponse;
import ibrahim.backend.entity.Inventory;
import org.springframework.stereotype.Component;

@Component
public class InventoryMapper {

    public InventoryResponse toResponse(Inventory inventory) {
        String status = calculateStatus(inventory.getQuantity(), inventory.getProduct().getReorderLevel());

        return InventoryResponse.builder()
                .id(inventory.getId())
                .productId(inventory.getProduct().getId())
                .productName(inventory.getProduct().getName())
                .productSku(inventory.getProduct().getSku())
                .warehouseId(inventory.getWarehouse().getId())
                .warehouseName(inventory.getWarehouse().getName())
                .quantity(inventory.getQuantity())
                .reorderLevel(inventory.getProduct().getReorderLevel())
                .status(status)
                .lastUpdated(inventory.getLastUpdated())
                .build();
    }

    private String calculateStatus(int quantity, int reorderLevel) {
        if (quantity == 0) {
            return "CRITICAL";
        } else if (quantity <= reorderLevel) {
            return "LOW";
        } else {
            return "HEALTHY";
        }
    }
}
