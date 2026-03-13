package ibrahim.backend.service;

import ibrahim.backend.dto.InventoryRequest;
import ibrahim.backend.dto.InventoryResponse;

import java.util.List;

public interface InventoryService {

    List<InventoryResponse> getAllInventory();

    InventoryResponse getInventoryById(Long id);

    List<InventoryResponse> getInventoryByProduct(Long productId);

    List<InventoryResponse> getInventoryByWarehouse(Long warehouseId);

    InventoryResponse createOrUpdateInventory(InventoryRequest request);

    void deleteInventory(Long id);
}
