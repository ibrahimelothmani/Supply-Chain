package ibrahim.backend.service.Impl;

import ibrahim.backend.dto.StockMovementRequest;
import ibrahim.backend.dto.StockMovementResponse;
import ibrahim.backend.entity.Inventory;
import ibrahim.backend.entity.Product;
import ibrahim.backend.entity.StockMovement;
import ibrahim.backend.entity.Warehouse;
import ibrahim.backend.enums.MovementType;
import ibrahim.backend.exception.InsufficientStockException;
import ibrahim.backend.exception.ResourceNotFoundException;
import ibrahim.backend.mapper.StockMovementMapper;
import ibrahim.backend.repository.InventoryRepository;
import ibrahim.backend.repository.ProductRepository;
import ibrahim.backend.repository.StockMovementRepository;
import ibrahim.backend.repository.WarehouseRepository;
import ibrahim.backend.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final InventoryRepository inventoryRepository;
    private final StockMovementMapper stockMovementMapper;

    @Override
    public List<StockMovementResponse> getAllMovements() {
        return stockMovementRepository.findAll()
                .stream()
                .map(stockMovementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public StockMovementResponse getMovementById(Long id) {
        StockMovement movement = stockMovementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock movement", id));
        return stockMovementMapper.toResponse(movement);
    }

    @Override
    @Transactional
    public StockMovementResponse recordMovement(StockMovementRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", request.getProductId()));

        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Warehouse", request.getWarehouseId()));

        updateInventory(product, warehouse, request.getMovementType(), request.getQuantity());

        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setWarehouse(warehouse);
        movement.setMovementType(request.getMovementType());
        movement.setQuantity(request.getQuantity());
        movement.setReference(request.getReference());

        StockMovement savedMovement = stockMovementRepository.save(movement);
        return stockMovementMapper.toResponse(savedMovement);
    }

    @Override
    public List<StockMovementResponse> getMovementsByProduct(Long productId) {
        return stockMovementRepository.findByProductId(productId)
                .stream()
                .map(stockMovementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<StockMovementResponse> getMovementsByWarehouse(Long warehouseId) {
        return stockMovementRepository.findByWarehouseId(warehouseId)
                .stream()
                .map(stockMovementMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<StockMovementResponse> getMovementsByType(MovementType type) {
        return stockMovementRepository.findByMovementType(type)
                .stream()
                .map(stockMovementMapper::toResponse)
                .collect(Collectors.toList());
    }

    private void updateInventory(Product product, Warehouse warehouse, MovementType type, int quantity) {
        Optional<Inventory> existingInventory = inventoryRepository
                .findByProductIdAndWarehouseId(product.getId(), warehouse.getId());

        Inventory inventory;
        if (existingInventory.isPresent()) {
            inventory = existingInventory.get();
        } else {
            inventory = new Inventory();
            inventory.setProduct(product);
            inventory.setWarehouse(warehouse);
            inventory.setQuantity(0);
        }

        switch (type) {
            case INBOUND:
                inventory.setQuantity(inventory.getQuantity() + quantity);
                break;
            case OUTBOUND:
                int newQuantity = inventory.getQuantity() - quantity;
                if (newQuantity < 0) {
                    throw new InsufficientStockException(inventory.getQuantity(), quantity);
                }
                inventory.setQuantity(newQuantity);
                break;
            case TRANSFER:
                int transferQuantity = inventory.getQuantity() - quantity;
                if (transferQuantity < 0) {
                    throw new InsufficientStockException(inventory.getQuantity(), quantity);
                }
                inventory.setQuantity(transferQuantity);
                break;
        }

        inventoryRepository.save(inventory);
    }
}
