package ibrahim.backend.service.Impl;

import ibrahim.backend.dto.InventoryRequest;
import ibrahim.backend.dto.InventoryResponse;
import ibrahim.backend.entity.Inventory;
import ibrahim.backend.entity.Product;
import ibrahim.backend.entity.Warehouse;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.mapper.InventoryMapper;
import ibrahim.backend.repository.InventoryRepository;
import ibrahim.backend.repository.ProductRepository;
import ibrahim.backend.repository.WarehouseRepository;
import ibrahim.backend.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final InventoryMapper inventoryMapper;

    @Override
    public List<InventoryResponse> getAllInventory() {
        return inventoryRepository.findAll()
                .stream()
                .map(inventoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryResponse getInventoryById(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record", id));
        return inventoryMapper.toResponse(inventory);
    }

    @Override
    public List<InventoryResponse> getInventoryByProduct(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .stream()
                .map(inventoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryResponse> getInventoryByWarehouse(Long warehouseId) {
        return inventoryRepository.findByWarehouseId(warehouseId)
                .stream()
                .map(inventoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InventoryResponse createOrUpdateInventory(InventoryRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", request.getProductId()));

        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse", request.getWarehouseId()));

        Optional<Inventory> existingInventory = inventoryRepository
                .findByProductIdAndWarehouseId(request.getProductId(), request.getWarehouseId());

        Inventory inventory;
        if (existingInventory.isPresent()) {
            inventory = existingInventory.get();
            inventory.setQuantity(request.getQuantity());
        } else {
            inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setWarehouse(warehouse);
            inventory.setQuantity(request.getQuantity());
        }

        Inventory savedInventory = inventoryRepository.save(inventory);
        return inventoryMapper.toResponse(savedInventory);
    }

    @Override
    public void deleteInventory(Long id) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory record", id));
        inventoryRepository.delete(inventory);
    }
}
